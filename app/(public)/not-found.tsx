import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full mt-4" />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Non Trouvée
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Retour à l'Accueil
          </Link>
          <Link
            href="/cancers"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all border-2 border-gray-200"
          >
            <Search className="w-5 h-5" />
            Explorer les Cancers
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/about"
            className="p-4 bg-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-1">À Propos</h3>
            <p className="text-sm text-gray-600">Découvrez notre mission</p>
          </Link>
          <Link
            href="/blog"
            className="p-4 bg-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-1">Blog</h3>
            <p className="text-sm text-gray-600">Articles et actualités</p>
          </Link>
          <Link
            href="/contact"
            className="p-4 bg-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-1">Contact</h3>
            <p className="text-sm text-gray-600">Besoin d'aide ?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
