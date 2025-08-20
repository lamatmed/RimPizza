/* eslint-disable @next/next/no-html-link-for-pages */
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page non trouvée</h2>
      <p className="mt-2 text-gray-600">
        Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="mt-6 rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
      >
        Retour à l’accueil
      </a>
    </div>
  );
}
 