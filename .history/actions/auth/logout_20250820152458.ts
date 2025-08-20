// Spécifie que cette fonction s'exécute côté serveur
'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';

interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  message: string;
  pageData: null;
}

export default async function logoutAction() {
  const cookieStore = cookies();
  const refreshTokenCookie = (await cookieStore).get('refresh_token')?.value;
  const accessTokenCookie = (await cookieStore).get('access_token')?.value;
  const apiClient = await fetchApiClient();

  // Si les tokens sont manquants, retourne immédiatement
  if (!refreshTokenCookie || !accessTokenCookie) {
    return {
      message: 'Vous n\'êtes pas actuellement connecté.',
    };
  }

  try {
    // Effectue la requête de déconnexion en utilisant les tokens d'accès et de rafraîchissement
    const logoutResponse = await apiClient?.AuthProvider.setAccessToken(
      accessTokenCookie
    ).logout('email', refreshTokenCookie);

    // Vérifie si la réponse n'est pas un booléen, indiquant une erreur
    if (typeof logoutResponse !== 'boolean') {
      const errorResponse = logoutResponse as unknown as IErrorResponse;
      return {
        message: errorResponse.message,
      };
    }

    // Si la déconnexion réussit, supprime les cookies
    (await cookieStore).delete('refresh_token');
    (await cookieStore).delete('access_token');
    (await cookieStore).delete('user_identifier');

    // Définit les cookies pour qu'ils expirent immédiatement
    (await cookieStore).set('refresh_token', '', { maxAge: 0 });
    (await cookieStore).set('access_token', '', { maxAge: 0 });
    (await cookieStore).set('user_identifier', '', { maxAge: 0 });

    return { message: 'Déconnexion réussie.' };
  } catch (err) {
    console.error('Erreur lors de la déconnexion :', err);
    throw new Error('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
  }
}