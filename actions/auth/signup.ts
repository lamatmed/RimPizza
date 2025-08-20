/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { IAttributes } from 'oneentry/dist/base/utils';
import { fetchApiClient } from '@/lib/oneentry';
import { ISignUpData } from 'oneentry/dist/auth-provider/authProvidersInterfaces';

export const getSignupFormData = async (): Promise<IAttributes[]> => {
  try {
    const apiClient = await fetchApiClient();
    const response = await apiClient?.Forms.getFormByMarker('users', 'fr_FR');
    return response?.attributes as unknown as IAttributes[];
  } catch (error: any) {
    console.error(error);
    throw new Error('Échec de la récupération des données du formulaire.');
  }
};

export const handleSignupSubmit = async (inputValues: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const apiClient = await fetchApiClient();

    const data: ISignUpData = {
      formIdentifier: 'users',
      authData: [
        { marker: 'email', value: inputValues.email },
        { marker: 'password', value: inputValues.password },
      ],
      formData: [{ marker: 'name', type: 'string', value: inputValues.name }],
      notificationData: {
        email: inputValues.email,
        phonePush: ['+1234567890'], // Exemple de numéro fictif
        phoneSMS: '+1234567890',    // Exemple de numéro fictif
      },
    };

    const value = await apiClient?.AuthProvider.signUp('email', data);
    return value;
  } catch (error: any) {
    console.error(error);
    if (error?.statusCode === 400) {
      return { message: error?.message }; // ex: "Email déjà utilisé"
    }

    throw new Error('Échec de la création du compte. Veuillez réessayer plus tard.');
  }
};
