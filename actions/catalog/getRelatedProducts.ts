'use server';
import { fetchApiClient } from '@/lib/oneentry';

// Action serveur pour récupérer les produits associés
export const getRelatedProducts = async (pageId: number, productId: number) => {
  const apiClient = await fetchApiClient();

  if (!pageId) {
    throw new Error('L’ID de la page est requis pour récupérer les produits associés.');
  }

  try {
    const products = await apiClient?.Products.getProductsByPageId(
      pageId,
      undefined,
      'fr_FR',
      {
        limit: 5,
        offset: 0,
        sortOrder: null,
        sortKey: null,
      }
    );

    const relatedProducts = [];

    for (let i = 0; i < products?.total; i++) {
      if (relatedProducts.length < 4) {
        if (products?.items[i].id !== productId) {
          relatedProducts.push(products?.items[i]);
        }
      } else {
        break;
      }
    }

    return relatedProducts;
  } catch (error) {
    console.error('Échec de la récupération des produits associés :', error);
    throw new Error('Impossible de récupérer les produits associés.');
  }
};
