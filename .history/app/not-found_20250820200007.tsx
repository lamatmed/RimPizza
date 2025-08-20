/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>
      
      <div className="relative max-w-md w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-200/50 dark:border-orange-800/50 p-8 text-center">
        <div className="mb-6">
          <div className="text-8xl mb-4">🍕</div>
          <div className="text-6xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            404
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Oups ! Page non trouvée
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Retour à l'accueil 🏠
        </a>
        
        <div className="mt-8 pt-6 border-t border-orange-200/50 dark:border-orange-800/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            En attendant, pourquoi ne pas commander une délicieuse pizza ? 🍕
          </p>
        </div>
      </div>
    </div>
  );
}