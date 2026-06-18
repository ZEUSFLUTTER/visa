'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, List, X } from 'lucide-react';

export default function FloatingButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Bouton Faire un Don */}
      <Link
        href="/donation"
        className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
        title="Faire un Don"
      >
        <Heart className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Faire un Don
        </span>
      </Link>

      {/* Bouton Tous les Cancers */}
      <Link
        href="/cancers"
        className="group relative bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Tous les Cancers"
      >
        <List className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Tous les Cancers
        </span>
      </Link>

      {/* Bouton Retour en Haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group relative bg-gray-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gray-600"
        title="Retour en Haut"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Retour en Haut
        </span>
      </button>
    </div>
  );
}
