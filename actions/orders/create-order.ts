'use server';

import { fetchApiClient } from '@/lib/oneentry';
import { cookies } from 'next/headers';
import { IOrderData } from 'oneentry/dist/orders/ordersInterfaces';

export default async function createOrder(
  orderData: IOrderData
): Promise<string> {
  const apiClient = await fetchApiClient();

  if (!apiClient) {
    throw new Error("Impossible de récupérer l'instance de l'API.");
  }

  const accessToken = (await cookies()).get('access_token')?.value;

  if (!accessToken) {
    throw new Error("Jeton d'accès manquant.");
  }

  try {
    // Debug : Affichage des données de commande envoyées
    console.log('Données de commande envoyées :', JSON.stringify(orderData, null, 2));

    // Création d'une nouvelle commande avec les données fournies
    const createdOrder = await apiClient.Orders.setAccessToken(
      accessToken
    ).createOrder('orders', orderData);

    console.log('Réponse de la commande créée :', createdOrder);

    if (!createdOrder?.id) {
      throw new Error('La création de la commande a échoué.');
    }

    // Création d'une session de paiement basée sur la commande créée
    const paymentSession = await apiClient.Payments.setAccessToken(
      accessToken
    ).createSession(createdOrder.id, 'session');

    if (!paymentSession?.paymentUrl) {
      throw new Error("Échec de la génération de l'URL de session de paiement.");
    }

    // Retourne l’URL de paiement pour redirection de l’utilisateur
    return paymentSession.paymentUrl;
  } catch (err) {
    console.error('Erreur lors du traitement de la commande et du paiement :', err);
    throw new Error(
      `Échec de la création de la commande ou de la session de paiement. ${
        err instanceof Error ? err.message : 'Erreur inconnue.'
      }`
    );
  }
}
