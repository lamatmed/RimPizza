// Spécifie que cette fonction s'exécute côté serveur
'use server';

import { fetchApiClient } from '@/lib/oneentry';

export const getProductDetails = async (productId: number) => {
  // Initialise le client API
  const apiClient = await fetchApiClient();

  // Vérifie que l'ID du produit est fourni
  if (!productId) {
    throw new Error('L\'identifiant du produit est requis.');
  }

  try {
    // Récupère les détails du produit en anglais (en_US)
    const product = await apiClient?.Products.getProductById(
      productId,
      'en_US'
    );
    return product;
  } catch (error) {
    // Journalise l'erreur et propage une exception avec un message en français
    console.error('Échec de la récupération du produit :', error);
    throw new Error('Échec de la récupération des détails du produit.');
  }
};