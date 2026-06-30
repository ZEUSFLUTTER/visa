import Link from 'next/link';
import { Heart, Users, Award, ArrowRight, Target, Shield, HandHeart } from 'lucide-react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { getApprovedTestimonials, getCancers } from '@/lib/db';
import { initDatabase, seedDatabase } from '@/lib/db';

// Initialize and seed database on startup
async function initializeDB() {
  try {
    await initDatabase();
    await seedDatabase();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDB();

export default async function Home() {
  const testimonials = await getApprovedTestimonials();
  const cancers = await getCancers();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Mission</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                L'ONG VISA DAM se consacre à la prévention et à la sensibilisation des cancers féminins au Togo, 
                avec un focus particulier sur le cancer du sein et le cancer du col de l'utérus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prévention</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sensibiliser les femmes à l'importance du dépistage précoce et promouvoir des modes de vie sains pour réduire les risques.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dépistage</h3>
                <p className="text-gray-700 leading-relaxed">
                  Faciliter l'accès au dépistage gratuit et accompagner les femmes dans leur parcours de santé reproductive.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Soutien</h3>
                <p className="text-gray-700 leading-relaxed">
                  Offrir un soutien moral et psychologique aux femmes touchées et à leurs familles tout au long de leur combat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cancers Féminins Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Cancers <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Féminins</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Informez-vous sur les principaux cancers féminins, leurs symptômes et l'importance du dépistage précoce.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {cancers.slice(0, 2).map((cancer: any) => (
                <Link
                  key={cancer.id}
                  href={`/cancers/${cancer.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
                >
                  <div 
                    className="h-48 bg-gradient-to-br flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${cancer.color}20 0%, ${cancer.color}40 100%)`
                    }}
                  >
                    <h3 
                      className="text-3xl font-bold px-6 text-center"
                      style={{ color: cancer.color }}
                    >
                      {cancer.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {cancer.shortDescription || cancer.description}
                    </p>
                    <div className="flex items-center text-pink-500 font-semibold group-hover:gap-3 transition-all">
                      En savoir plus
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/cancers"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Découvrir tous les cancers féminins
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">1000+</div>
                <div className="text-xl opacity-90">Femmes sensibilisées</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-xl opacity-90">Dépistages réalisés</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-12 h-12" />
                </div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-xl opacity-90">Vies sauvées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ensemble, luttons contre les cancers féminins
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Votre soutien nous permet de continuer nos actions de prévention, de dépistage et d'accompagnement des femmes au Togo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donation"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Faire un don
              </Link>
              <Link
                href="/contact"
                className="bg-white text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full font-bold hover:bg-pink-50 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
