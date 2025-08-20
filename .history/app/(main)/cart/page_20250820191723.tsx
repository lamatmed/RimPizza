/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  LogIn,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/stores/cartStore';
import getUserSession from '@/actions/auth/getUserSession';
import { IUserEntity } from 'oneentry/dist/users/usersInterfaces';
import createOrder from '@/actions/orders/create-order';
import { IOrderData } from 'oneentry/dist/orders/ordersInterfaces';

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserEntity | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const userData = await getUserSession();
        if (userData) setUser(userData as IUserEntity);
        setIsLoading(false);
      } catch (error) {
        console.error({ error });
        setUser(null);
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Taxe de 10%
  const total = subtotal + tax;

  const createOrderAndCheckout = async () => {
    try {
      // Obtenir le nom de l'utilisateur à partir des formData de la session
      let userName = 'Client';

      if (user?.formData) {
        // Chercher les champs de nom dans les formData de l'utilisateur
        const nameField = user.formData.find(
          (field) =>
            field.marker === 'name' ||
            field.marker === 'first_name' ||
            field.marker === 'full_name'
        );

        const firstNameField = user.formData.find(
          (field) => field.marker === 'first_name'
        );
        const lastNameField = user.formData.find(
          (field) => field.marker === 'last_name'
        );

        if (nameField?.value) {
          userName = nameField.value;
        } else if (firstNameField?.value || lastNameField?.value) {
          userName = `${firstNameField?.value || ''} ${
            lastNameField?.value || ''
          }`.trim();
        }
      }

      const data = {
        formIdentifier: 'order_form',
        paymentAccountIdentifier: 'stripe_payment',
        formData: [
          {
            marker: 'name',
            value: userName,
            type: 'string',
          },
        ],
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      } as IOrderData;

      console.log('Envoi des données de commande:', data);
      console.log('Nom d\'utilisateur envoyé:', userName);
      console.log('FormData utilisateur:', user?.formData);

      const url = await createOrder(data);
      clearCart();
      router.push(url);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      // Vous pourriez afficher une notification toast ici
      alert('Échec du traitement de la commande. Veuillez réessayer.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Motif d'arrière-plan */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-4xl mx-auto p-4 sm:p-8'>
        <div className='text-center mb-6 sm:mb-8 lg:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight px-4'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              Votre Panier de Pizzas 🍕
            </span>
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4'>
            Prêt à satisfaire vos envies ?
          </p>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center h-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4'></div>
              <p className='text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                Chargement de votre délicieux panier...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className='space-y-4 sm:space-y-6'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-600'
                >
                  {/* Disposition mobile */}
                  <div className='flex flex-col space-y-4 sm:hidden'>
                    <div className='flex items-center space-x-3'>
                      <div className='relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-2 flex-shrink-0'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-14 h-14 object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-lg font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent truncate mb-1'>
                          {item.name}
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 font-semibold text-base'>
                          ${item?.price?.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => removeItem(item.id)}
                        className='text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 cursor-pointer h-9 w-9 flex-shrink-0'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    {/* Contrôles de quantité mobile */}
                    <div className='flex items-center justify-center'>
                      <div className='flex items-center space-x-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-3'>
                        <Button
                          size='icon'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white cursor-pointer h-10 w-10 rounded-xl'
                        >
                          <Minus className='h-5 w-5' />
                        </Button>
                        <div className='text-center min-w-[3rem]'>
                          <span className='text-xl font-bold text-gray-800 dark:text-gray-200'>
                            {item.quantity}
                          </span>
                        </div>
                        <Button
                          size='icon'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white cursor-pointer h-10 w-10 rounded-xl'
                        >
                          <Plus className='h-5 w-5' />
                        </Button>
                      </div>
                    </div>

                    {/* Total de l'article mobile */}
                    <div className='flex justify-between items-center pt-2 border-t border-orange-200 dark:border-orange-700'>
                      <span className='text-gray-600 dark:text-gray-400 font-medium'>
                        Total article :
                      </span>
                      <span className='text-lg font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Disposition bureau */}
                  <div className='hidden sm:flex sm:items-center sm:space-x-4'>
                    <div className='flex items-center space-x-4 flex-1'>
                      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-2'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-20 h-20 object-cover rounded-xl'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent line-clamp-1 mb-1'>
                          {item.name}
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 font-semibold'>
                          ${item?.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-3 bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-2'>
                        <Button
                          size='icon'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white cursor-pointer h-8 w-8 rounded-xl'
                        >
                          <Minus className='h-4 w-4' />
                        </Button>
                        <Input
                          type='number'
                          min='0'
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className='w-16 text-center border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm font-bold text-gray-800 dark:text-gray-200 rounded-xl'
                        />
                        <Button
                          size='icon'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white cursor-pointer h-8 w-8 rounded-xl'
                        >
                          <Plus className='h-4 w-4' />
                        </Button>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => removeItem(item.id)}
                        className='text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl transition-all duration-200 cursor-pointer h-10 w-10'
                      >
                        <Trash2 className='h-5 w-5' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8'>
              <div className='text-center mb-4 sm:mb-6'>
                <h2 className='text-xl sm:text-2xl lg:text-3xl font-black mb-2'>
                  <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    Récapitulatif de Commande 🧾
                  </span>
                </h2>
                <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base'>
                  Détails de votre délicieuse commande
                </p>
              </div>

              <div className='space-y-3 sm:space-y-4 mb-4 sm:mb-6'>
                <div className='flex justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'>
                  <span className='font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                    Sous-total
                  </span>
                  <span className='font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base'>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'>
                  <span className='font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base'>
                    Taxe
                  </span>
                  <span className='font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base'>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className='border-t-2 border-orange-200 dark:border-orange-700 my-3 sm:my-4'></div>
                <div className='flex justify-between items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 border border-orange-300 dark:border-orange-600'>
                  <span className='text-base sm:text-lg font-black text-gray-800 dark:text-gray-200'>
                    Total
                  </span>
                  <span className='text-lg sm:text-xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              {user ? (
                <Button
                  className='w-full h-12 sm:h-14 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer'
                  disabled={!cartItems.length}
                  onClick={createOrderAndCheckout}
                >
                  <CreditCard className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                  <span className='hidden xs:inline'>Passer à la </span>Caisse
                  🍕
                </Button>
              ) : (
                <Button
                  className='w-full h-12 sm:h-14 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer'
                  onClick={() => router.push('/auth?type=login')}
                >
                  <LogIn className='mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6' />
                  <span className='hidden xs:inline'>Connectez-vous pour </span>Commander 🍕
                </Button>
              )}
            </div>
          </>
        )}

        {!isLoading && cartItems.length === 0 && (
          <div className='text-center py-8 sm:py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-6 sm:p-8 mt-4'>
            <div className='mb-4 sm:mb-6'>
              <ShoppingCart className='mx-auto h-16 w-16 sm:h-20 sm:w-20 text-orange-400 mb-3 sm:mb-4' />
              <div className='text-4xl sm:text-6xl mb-3 sm:mb-4'>🍕</div>
            </div>
            <h2 className='text-2xl sm:text-3xl font-black mb-3 sm:mb-4'>
              <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                Votre panier de pizzas est vide !
              </span>
            </h2>
            <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto px-4'>
              On dirait que vous n'avez pas encore ajouté de délicieuses pizzas à votre
              panier. Il est temps d'y remédier !
            </p>
            <Button
              className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'
              onClick={() => router.push('/')}
            >
              <span className='sm:hidden'>Acheter des pizzas ! 🍕</span>
              <span className='hidden sm:inline'>
                Commencer à magasiner des pizzas ! 🍕
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}