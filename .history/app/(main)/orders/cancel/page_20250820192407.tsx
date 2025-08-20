'use client';

import { XSquareIcon, Pizza, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrderCanceled() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10 flex items-center justify-center p-4'>
      {/* Motif d'arrière-plan */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-8 sm:p-12'>
        <div className='text-center mb-8'>
          {/* Icônes d'annulation */}
          <div className='relative mb-6'>
            <div className='mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-950/20 rounded-full flex items-center justify-center mb-4 border-4 border-red-200 dark:border-red-700'>
              <XSquareIcon className='w-12 h-12 text-red-600 dark:text-red-400' />
            </div>
            <div className='text-6xl mb-4'>🍕❌</div>
          </div>

          <h1 className='text-4xl sm:text-5xl font-black mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              Commande Annulée 😔
            </span>
          </h1>

          <p className='text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto'>
            Votre commande de pizza a été annulée. Pas d'inquiétude - vos envies sont toujours les bienvenues ici !
          </p>

          {/* Carte de raison d'annulation */}
          <div className='bg-gradient-to-r from-red-50 via-orange-50 to-red-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-red-950/20 border border-red-200 dark:border-red-700 rounded-2xl p-6 mb-8'>
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <Pizza className='w-6 h-6 text-orange-600 dark:text-orange-400' />
              <span className='text-lg font-bold text-gray-800 dark:text-gray-200'>
                Statut du Paiement : Annulé
              </span>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                Ne vous inquiétez pas ! Aucun frais n'a été prélevé sur votre compte.
              </p>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700'>
                <span className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  💳 Votre moyen de paiement n'a pas été débité
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center space-y-6'>
          <p className='text-lg text-gray-600 dark:text-gray-300 font-semibold'>
            Prêt à réessayer ? Nous avons des pizzas fraîches qui vous attendent ! 🍕
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/cart'>
              <Button className='bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'>
                <ArrowLeft className='w-5 h-5 mr-2' />
                Retour au Panier 🛒
              </Button>
            </Link>

            <Link href='/'>
              <Button className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer'>
                Voir Plus de Pizzas ! 🍕
              </Button>
            </Link>
          </div>

          {/* Message d'encouragement */}
          <div className='mt-8 p-6 rounded-2xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-800'>
            <h3 className='text-lg font-bold text-orange-800 dark:text-orange-200 mb-2'>
              Toujours faim ? 🤤
            </h3>
            <p className='text-sm font-semibold text-orange-700 dark:text-orange-300 mb-3'>
              Ne laissez pas cela vous empêcher d'obtenir la pizza parfaite !
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              <div className='text-center p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>🍕</div>
                <div className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
                  Options Fraîches
                </div>
              </div>
              <div className='text-center p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>💳</div>
                <div className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
                  Paiement Sécurisé
                </div>
              </div>
              <div className='text-center p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'>
                <div className='text-2xl mb-1'>🚚</div>
                <div className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
                  Livraison Rapide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}