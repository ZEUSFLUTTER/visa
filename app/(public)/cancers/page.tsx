'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import { getCancers } from '@/lib/db';
import type { Cancer } from '@/types/cancer';

export default function CancersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cancers, setCancers] = useState<Cancer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('/api/cancers').then(res => res.json());
        setCancers(data);
      } catch (error) {
        console.error('Error fetching cancers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCancers = cancers.filter((cancer) =>
    cancer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Tous les{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Cancers
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Découvrez des informations complètes sur les différents types de
              cancer, leurs symptômes, facteurs de risque et méthodes de dépistage.
            </p>

            {/* Barre de recherche */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un type de cancer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grille des Cancers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredCancers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Aucun cancer trouvé pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCancers.map((cancer) => (
                <Link
                  key={cancer.id}
                  href={`/cancers/${cancer.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image/Bannière */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {cancer.image ? (
                      <>
                        <Image
                          src={cancer.image}
                          alt={cancer.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span
                            className="text-2xl font-bold text-white drop-shadow-lg"
                          >
                            {cancer.name}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ backgroundColor: cancer.color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-4xl font-bold text-center px-4"
                            style={{ color: cancer.color }}
                          >
                            {cancer.name}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3
                      className="text-2xl font-bold mb-3 group-hover:underline"
                      style={{ color: cancer.color }}
                    >
                      {cancer.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {cancer.shortDescription}
                    </p>



                    {/* Bouton */}
                    <div className="flex items-center gap-2 font-semibold text-pink-500">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
