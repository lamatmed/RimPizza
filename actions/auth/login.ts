/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { IAttributes } from 'oneentry/dist/base/utils';
import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IErroredResponse {
  statusCode: number;
  message: string;
}

export const getLoginFormData = async (): Promise<IAttributes[]> => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker('users', 'en_US');

    // On enlève le champ "name" du formulaire de connexion
    const filteredAttributes = response?.attributes?.filter(
      (attr: IAttributes) => attr.marker !== 'name'
    );

    return filteredAttributes as unknown as IAttributes[];
  } catch (error: any) {
    console.error(error);
    throw new Error('Échec de la récupération des données du formulaire.');
  }
};

export const handleLoginSubmit = async (inputValues: {
  email: string;
  password: string;
}) => {
  try {
    const apiClient = await fetchApiClient();

    const data = {
      authData: [
        { marker: 'email', value: inputValues.email },
        { marker: 'password', value: inputValues.password },
      ],
    };

    const response = await apiClient?.AuthProvider.auth('email', data);

    if (!response?.userIdentifier) {
      const error = response as unknown as IErroredResponse;
      return {
        message: error.message, // message d’erreur déjà renvoyé par l’API
      };
    }

    (await cookies()).set('access_token', response.accessToken, {
      maxAge: 60 * 60 * 24, // 24 heures
    });

    (await cookies()).set('refresh_token', response.refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });
  } catch (error: any) {
    console.error(error);
    if (error?.statusCode === 401) {
      return { message: error?.message }; // ex: "Identifiants incorrects"
    }

    throw new Error("Échec de la connexion. Veuillez réessayer.");
  }
  redirect('/');
};
