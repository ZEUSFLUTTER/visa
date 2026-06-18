export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6">
            Mentions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Légales
            </span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                1. Éditeur du Site
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site visadam.org est édité par :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-800 font-medium leading-relaxed">
                  <strong>ONG VISA DAM</strong><br />
                  Organisation Non Gouvernementale<br />
                  Siège social : Bénin<br />
                  Email : contact@ongvisa.org<br />
                  Téléphone : +229 90 62 96 93
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                2. Directeur de Publication
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Directeur de l'ONG VISA DAM
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                3. Hébergement
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-800 leading-relaxed">
                  <strong>Hébergeur :</strong> [Nom de l'hébergeur]<br />
                  Adresse : [Adresse complète]<br />
                  Téléphone : [Numéro de téléphone]
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                4. Propriété Intellectuelle
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos,
                graphismes) est la propriété exclusive de l'ONG VISA DAM, sauf
                mention contraire. Toute reproduction, distribution, modification,
                adaptation ou publication de ces éléments est strictement interdite
                sans l'autorisation écrite préalable de l'ONG VISA DAM.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                5. Crédits
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Conception et développement : [Nom de l'agence/développeur]<br />
                Photographies : [Sources des images]<br />
                Icônes : Lucide React
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                6. Responsabilité
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'ONG VISA DAM s'efforce de fournir des informations aussi précises
                que possible sur ce site. Toutefois, elle ne peut garantir
                l'exactitude, la complétude et l'actualité des informations
                diffusées. L'ONG VISA DAM décline toute responsabilité :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>
                  Pour toute imprécision, inexactitude ou omission portant sur des
                  informations disponibles sur le site
                </li>
                <li>
                  Pour tout dommage résultant d'une intrusion frauduleuse d'un
                  tiers ayant entraîné une modification des informations
                </li>
                <li>
                  Pour tout dommage direct ou indirect causé au matériel de
                  l'utilisateur lors de l'accès au site
                </li>
                <li>
                  Pour tout dommage résultant du contenu des sites liés ou
                  référencés
                </li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                7. Disclaimer Médical
              </h2>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-900 leading-relaxed">
                  <strong>AVERTISSEMENT IMPORTANT :</strong> Les informations
                  médicales fournies sur ce site sont destinées à des fins
                  éducatives et informatives uniquement. Elles ne constituent en
                  aucun cas un avis médical professionnel, un diagnostic ou un
                  traitement. Consultez toujours un médecin qualifié pour toute
                  question concernant votre santé ou un traitement médical. Ne
                  négligez jamais un avis médical professionnel ou ne tardez pas à
                  le demander en raison d'informations que vous auriez lues sur ce
                  site.
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                8. Liens Hypertextes
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le site peut contenir des liens vers d'autres sites. L'ONG VISA DAM
                n'exerce aucun contrôle sur ces sites et décline toute
                responsabilité quant à leur contenu. L'existence d'un lien vers un
                autre site ne constitue pas une validation de ce site ou de son
                contenu.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                9. Droit Applicable
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le présent site et les présentes mentions légales sont régis par le
                droit applicable au Bénin. Tout litige relatif à l'utilisation du site sera
                soumis à la compétence exclusive des tribunaux compétents.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
                10. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant ces mentions légales, vous pouvez
                nous contacter :
              </p>
              <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-200">
                <p className="text-gray-800 font-medium">
                  Email: contact@ongvisa.org<br />
                  Téléphone: +229 90 62 96 93<br />
                  Adresse: Bénin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
