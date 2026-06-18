export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6">
            Politique de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Confidentialité
            </span>
          </h1>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'ONG VISA DAM (ci-après "nous", "notre") s'engage à protéger la
                confidentialité des données personnelles de ses utilisateurs. Cette
                politique de confidentialité explique comment nous collectons,
                utilisons et protégeons vos informations conformément au Règlement
                Général sur la Protection des Données (RGPD).
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                2. Données Collectées
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous collectons les types de données suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Informations d'identification (nom, prénom, email)</li>
                <li>Données de navigation (cookies, adresse IP)</li>
                <li>Informations volontairement fournies via les formulaires</li>
                <li>Données de donation (montant, fréquence)</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                3. Utilisation des Données
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Répondre à vos demandes de contact</li>
                <li>Traiter vos dons et émettre des reçus fiscaux</li>
                <li>Envoyer des newsletters (avec votre consentement)</li>
                <li>Améliorer nos services et notre site web</li>
                <li>Respecter nos obligations légales</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                4. Base Légale du Traitement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Votre consentement explicite</li>
                <li>L'exécution d'un contrat (dons, services)</li>
                <li>Nos obligations légales</li>
                <li>Notre intérêt légitime (amélioration des services)</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                5. Durée de Conservation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Vos données sont conservées pendant la durée nécessaire aux
                finalités pour lesquelles elles ont été collectées, dans le respect
                des obligations légales (par exemple, 10 ans pour les données
                comptables liées aux dons).
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                6. Vos Droits
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                7. Sécurité des Données
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous mettons en œuvre des mesures techniques et organisationnelles
                appropriées pour protéger vos données contre tout accès non
                autorisé, altération, divulgation ou destruction. Cela inclut le
                chiffrement SSL/TLS, des sauvegardes régulières et des contrôles
                d'accès stricts.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                8. Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Notre site utilise des cookies pour améliorer votre expérience de
                navigation et analyser le trafic. Vous pouvez gérer vos préférences
                en matière de cookies via les paramètres de votre navigateur.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                9. Partage des Données
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous ne vendons ni ne louons vos données personnelles. Vos données
                peuvent être partagées avec des prestataires de services tiers
                (hébergement, paiement) uniquement dans le cadre nécessaire à nos
                services et sous contrat de confidentialité.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                10. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Pour exercer vos droits ou pour toute question concernant cette
                politique de confidentialité, contactez notre Délégué à la
                Protection des Données (DPO) :
              </p>
              <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
                <p className="text-gray-800 font-medium">
                  Email: dpo@visadam.org<br />
                  Adresse: ONG VISA DAM, Bénin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
