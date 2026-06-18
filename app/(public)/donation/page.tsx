'use client';

import { useState } from 'react';
import { Heart, CreditCard, Check } from 'lucide-react';

const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

export default function DonationPage() {
  const [amount, setAmount] = useState<number | string>(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [submitted, setSubmitted] = useState(false);

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setAmount('custom');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'intégration de paiement
    setSubmitted(true);
  };

  const finalAmount: number = amount === 'custom' 
    ? (parseFloat(customAmount) || 0) 
    : (typeof amount === 'number' ? amount : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Faites un{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                Don
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Votre générosité nous permet de continuer à sensibiliser, informer et
              soutenir les personnes touchées par le cancer. Chaque don compte.
            </p>
          </div>
        </div>
      </section>

      {/* Impact des Dons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            L'Impact de Votre Don
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
              <h3 className="text-2xl font-bold text-pink-500 mb-3">15 000 FCFA</h3>
              <p className="text-gray-700">
                Finance des brochures d'information sur la prévention pour 50
                personnes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-purple-500 mb-3">30 000 FCFA</h3>
              <p className="text-gray-700">
                Permet d'organiser une séance de sensibilisation dans une école ou
                une entreprise
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
              <h3 className="text-2xl font-bold text-pink-500 mb-3">65 000 FCFA</h3>
              <p className="text-gray-700">
                Finance le soutien psychologique d'un patient pendant un mois
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de Don */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Choisissez Votre Contribution
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Fréquence */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Fréquence du Don
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFrequency('once')}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                          frequency === 'once'
                            ? 'border-pink-500 bg-pink-50 text-pink-500'
                            : 'border-gray-200 hover:border-pink-200'
                        }`}
                      >
                        Don Unique
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                          frequency === 'monthly'
                            ? 'border-pink-500 bg-pink-50 text-pink-500'
                            : 'border-gray-200 hover:border-pink-200'
                        }`}
                      >
                        Don Mensuel
                      </button>
                    </div>
                  </div>

                  {/* Montants prédéfinis */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Montant du Don
                    </label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {presetAmounts.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleAmountSelect(preset)}
                          className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${
                            amount === preset
                              ? 'border-pink-500 bg-pink-500 text-white shadow-lg scale-105'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                        >
                          {preset.toLocaleString('fr-FR')} FCFA
                        </button>
                      ))}
                    </div>

                    {/* Montant personnalisé */}
                    <div>
                      <label
                        htmlFor="customAmount"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Ou entrez un montant personnalisé
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="customAmount"
                          min="500"
                          step="100"
                          value={customAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                          className="w-full px-4 py-3 pr-16 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-lg"
                          placeholder="Montant"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-base font-semibold">
                          FCFA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Résumé */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">
                        Type de don:
                      </span>
                      <span className="font-bold text-gray-900">
                        {frequency === 'once' ? 'Unique' : 'Mensuel'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Montant:</span>
                      <span className="text-3xl font-bold text-pink-500">
                        {finalAmount.toLocaleString('fr-FR')} FCFA
                        {frequency === 'monthly' && (
                          <span className="text-base">/mois</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Informations du Donateur */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vos Informations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Prénom"
                        required
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        required
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none"
                    />
                  </div>

                  {/* Bouton de Soumission */}
                  <button
                    type="submit"
                    disabled={finalAmount <= 0}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CreditCard className="w-6 h-6" />
                    Procéder au Paiement Sécurisé
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Paiement sécurisé par Stripe ou PayPal
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Merci pour Votre Générosité !
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Votre don de <strong>{finalAmount.toLocaleString('fr-FR')} FCFA</strong> a été enregistré
                  avec succès. Vous recevrez un reçu fiscal par email.
                </p>
                <p className="text-gray-600">
                  Grâce à vous, nous pouvons continuer notre mission de
                  sensibilisation et de prévention du cancer.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Autres Moyens de Soutien */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Autres Moyens de Nous Soutenir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Devenir Bénévole
              </h3>
              <p className="text-gray-600 mb-4">
                Donnez de votre temps pour aider nos actions sur le terrain.
              </p>
              <a
                href="/contact"
                className="text-pink-500 font-semibold hover:underline"
              >
                En savoir plus →
              </a>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Partenariat
              </h3>
              <p className="text-gray-600 mb-4">
                Entreprises, associations, devenez partenaires de notre mission.
              </p>
              <a
                href="/contact"
                className="text-purple-500 font-semibold hover:underline"
              >
                Nous contacter →
              </a>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Partager
              </h3>
              <p className="text-gray-600 mb-4">
                Partagez nos ressources et sensibilisez votre entourage.
              </p>
              <a href="/blog" className="text-pink-500 font-semibold hover:underline">
                Notre blog →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function Share2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}
