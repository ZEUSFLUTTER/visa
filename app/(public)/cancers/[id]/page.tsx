import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, AlertCircle, Heart, FileText, ExternalLink } from 'lucide-react';
import { getCancers, getCancerById } from '@/lib/db';
import type { Cancer, Testimonial, Resource } from '@/types/cancer';

export async function generateStaticParams() {
  const cancers = await getCancers();
  return cancers.map((cancer: Cancer) => ({
    id: cancer.id,
  }));
}

export default async function CancerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cancer = await getCancerById(id);

  if (!cancer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/cancers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à tous les cancers
          </Link>
        </div>
      </div>

      {/* En-tête avec bannière et image */}
      <section className="relative py-20 overflow-hidden">
        {/* Image de fond si disponible */}
        {cancer.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={cancer.image}
              alt={cancer.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
          </div>
        )}

        {/* Contenu */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: cancer.color }}
            >
              {cancer.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {cancer.description}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Informations Générales */}
      {(cancer.epidemiology || cancer.riskPopulation) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: cancer.color }}
              >
                Informations Générales
              </h2>

              <div className="space-y-6">
                {cancer.epidemiology && (
                  <div className="p-6 bg-white rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Épidémiologie
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {cancer.epidemiology}
                    </p>
                  </div>
                )}

                {cancer.riskPopulation && (
                  <div className="p-6 bg-white rounded-xl shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Population à Risque
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {cancer.riskPopulation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 2: Facteurs de Risque */}
      {(cancer.riskFactors?.modifiable?.length > 0 || cancer.riskFactors?.nonModifiable?.length > 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-8"
                style={{ color: cancer.color }}
              >
                Facteurs de Risque
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Facteurs Modifiables */}
                {cancer.riskFactors?.modifiable?.length > 0 && (
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cancer.color }}
                      />
                      <h3 className="text-xl font-bold text-gray-900">
                        Facteurs Modifiables
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {cancer.riskFactors.modifiable.map((factor: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cancer.color }}
                          />
                          <span className="text-gray-700">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Facteurs Non Modifiables */}
                {cancer.riskFactors?.nonModifiable?.length > 0 && (
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cancer.color }}
                      />
                      <h3 className="text-xl font-bold text-gray-900">
                        Facteurs Non Modifiables
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {cancer.riskFactors.nonModifiable.map((factor: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cancer.color }}
                          />
                          <span className="text-gray-700">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Symptômes */}
      {(cancer.symptoms?.early?.length > 0 || cancer.symptoms?.advanced?.length > 0 || cancer.symptoms?.warningSign?.length > 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-8"
                style={{ color: cancer.color }}
              >
                Symptômes et Signes d'Alerte
              </h2>

              <div className="space-y-6">
                {/* Symptômes Précoces */}
                {cancer.symptoms?.early?.length > 0 && (
                  <div className="p-6 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Symptômes Précoces
                    </h3>
                    <ul className="space-y-2">
                      {cancer.symptoms.early.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Symptômes Avancés */}
                {cancer.symptoms?.advanced?.length > 0 && (
                  <div className="p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Symptômes Avancés
                    </h3>
                    <ul className="space-y-2">
                      {cancer.symptoms.advanced.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Signes d'Alerte */}
                {cancer.symptoms?.warningSign?.length > 0 && (
                  <div className="p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-6 h-6 text-red-500" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Signes d'Alerte - Consultez Immédiatement
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {cancer.symptoms.warningSign.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700 font-medium">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Dépistage et Prévention - Bien centrée */}
      {(cancer.screening?.primaryPrevention?.length > 0 || cancer.screening?.availableTests?.length > 0 || cancer.screening?.recommendations?.length > 0 || cancer.screening?.resultsInterpretation || cancer.screening?.screeningCenters?.length > 0) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                style={{ color: cancer.color }}
              >
                Dépistage et Prévention
              </h2>

              <div className="space-y-8">
                {/* Prévention Primaire */}
                {cancer.screening?.primaryPrevention?.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Prévention Primaire
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {cancer.screening.primaryPrevention.map((prevention: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
                        >
                          <Heart
                            className="w-6 h-6 mt-0.5 flex-shrink-0"
                            style={{ color: cancer.color }}
                          />
                          <span className="text-gray-700 font-medium">{prevention}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tests de Dépistage Disponibles */}
                {cancer.screening?.availableTests?.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Tests de Dépistage Disponibles
                    </h3>
                    <div className="space-y-3 max-w-2xl mx-auto">
                      {cancer.screening.availableTests.map((test: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                        >
                          <FileText
                            className="w-6 h-6 flex-shrink-0"
                            style={{ color: cancer.color }}
                          />
                          <span className="text-gray-700 font-medium">{test}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommandations de Dépistage */}
                {cancer.screening?.recommendations?.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Recommandations de Dépistage
                    </h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                      {cancer.screening.recommendations.map((rec: { ageGroup: string; frequency: string; tests: string[] }, index: number) => (
                        <div
                          key={index}
                          className="p-6 bg-white rounded-xl shadow-sm border-l-4"
                          style={{ borderColor: cancer.color }}
                        >
                          <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
                            {rec.ageGroup && (
                              <span
                                className="px-5 py-2 rounded-full text-white font-bold text-lg"
                                style={{ backgroundColor: cancer.color }}
                              >
                                {rec.ageGroup}
                              </span>
                            )}
                            {rec.frequency && (
                              <span className="text-gray-600 font-medium">
                                Fréquence: <strong>{rec.frequency}</strong>
                              </span>
                            )}
                          </div>
                          {rec.tests && rec.tests.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                              {rec.tests.map((test: string, testIndex: number) => (
                                <span
                                  key={testIndex}
                                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-gray-100"
                                >
                                  {test}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interprétation des Résultats */}
                {cancer.screening?.resultsInterpretation && (
                  <div
                    className="p-8 rounded-2xl border-l-8 shadow-lg max-w-3xl mx-auto"
                    style={{
                      backgroundColor: `${cancer.color}10`,
                      borderColor: cancer.color,
                    }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      Interprétation des Résultats
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-center">
                      {cancer.screening.resultsInterpretation}
                    </p>
                  </div>
                )}

                {/* Centres de Dépistage */}
                {cancer.screening?.screeningCenters?.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Où se faire Dépister ?
                    </h3>
                    <div className="max-w-2xl mx-auto space-y-3">
                      {cancer.screening.screeningCenters.map((center: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cancer.color }}
                          />
                          <span className="text-gray-700">{center}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Témoignages */}
      {cancer.testimonials.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-8"
                style={{ color: cancer.color }}
              >
                Témoignages de Patients
              </h2>

              <div className="space-y-6">
                {cancer.testimonials.map((testimonial: Testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-6 bg-white rounded-xl shadow-md"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.photo ? (
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: cancer.color }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        {testimonial.date && (
                          <p className="text-sm text-gray-500">
                            {new Date(testimonial.date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {testimonial.story}
                    </p>
                  </div>
                ))}
              </div>

              {/* Formulaire de Soumission */}
              <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Partagez Votre Témoignage
                </h3>
                <p className="text-gray-700 mb-4">
                  Votre histoire peut inspirer et aider d'autres personnes.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Nous Contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 6: Ressources */}
      {cancer.resources.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-8"
                style={{ color: cancer.color }}
              >
                Ressources Supplémentaires
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {cancer.resources.map((resource: Resource, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${cancer.color}20` }}
                      >
                        <ExternalLink
                          className="w-6 h-6"
                          style={{ color: cancer.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:underline">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {resource.description}
                        </p>
                        <span
                          className="inline-block mt-2 text-sm font-semibold"
                          style={{ color: cancer.color }}
                        >
                          {resource.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, ${cancer.color}15 0%, ${cancer.color}05 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Besoin d'Aide ou d'Informations ?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              N'hésitez pas à nous contacter pour toute question ou demande de
              soutien.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full font-semibold text-white hover:shadow-lg transition-all"
                style={{ backgroundColor: cancer.color }}
              >
                Nous Contacter
              </Link>
              <Link
                href="/cancers"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all border-2 border-gray-200"
              >
                Autres Cancers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
