// Spécifie que cette fonction s'exécute côté serveur
'use server';

import { fetchApiClient } from '@/lib/oneentry';

interface SearchParams {
  query: string;
}

export const searchProductsAction = async ({ query }: SearchParams) => {
  try {
    // Initialise le client API
    const apiClient = await fetchApiClient();

    // Effectue la recherche de produits avec la requête en anglais (en_US)
    const products = await apiClient?.Products.searchProduct(query, 'en_US');

    // Retourne les produits trouvés ou un tableau vide
    return products || [];
  } catch (error) {
    // Journalise l'erreur et propage une exception avec un message détaillé
    console.error('Erreur lors de la recherche de produits :', error);
    throw new Error(
      `Échec de la recherche de produits: ${
        error instanceof Error ? error.message : 'Erreur inconnue'
      }`
    );
  }
};