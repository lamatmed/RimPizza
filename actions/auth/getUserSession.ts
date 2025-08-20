// Spécifie que cette fonction s'exécute côté serveur
'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';

interface IError {
  statusCode: number;
  message: string;
}

export default async function getUserSession() {
  // Initialise le client API
  const apiClient = await fetchApiClient();
  
  // Récupère le token d'accès depuis les cookies
  const accessToken = (await cookies()).get('access_token')?.value;

  // Si aucun token n'est trouvé, retourne null
  if (!accessToken) {
    return null;
  }

  try {
    // Configure le token et récupère les données utilisateur
    const currentUser = await apiClient
      ?.Users
      .setAccessToken(accessToken)
      .getUser();

    // Vérifie la validité des données utilisateur
    if (!currentUser || !currentUser.id) {
      throw new Error('Données utilisateur invalides ou ID manquant.');
    }

    return currentUser;
  } catch (err: unknown) {
    // Gestion des erreurs 401 (non autorisé)
    if (
      err instanceof Error &&
      (err as unknown as IError).statusCode === 401
    ) {
      return undefined;
    }
    
    // Log des autres erreurs
    console.error('Échec de la récupération de la session utilisateur :', err);
  }
}