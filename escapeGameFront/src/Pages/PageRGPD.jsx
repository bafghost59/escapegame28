

function PageRGPD() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E2F] text-[#EAEAEA]">
      

      {/* Contenu principal */}
      <main className="flex-1 px-6 md:px-16 py-12">
        <h1 className="font-montserrat font-bold text-[36px] text-white mb-6">
          Politique de Confidentialité (RGPD)
        </h1>

        <section className="space-y-6 text-[16px] md:text-[18px]">
          <p>
            La protection de vos données personnelles est une priorité pour nous. 
            Cette page décrit comment nous collectons, utilisons et protégeons vos informations conformément au RGPD.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            1. Données collectées
          </h2>
          <p>
            Nous collectons uniquement les données nécessaires pour :
          </p>
          <ul className="list-disc list-inside">
            <li>La gestion des comptes utilisateurs</li>
            <li>La réservation et le paiement des escape games</li>
            <li>L’envoi de notifications et communications liées au service</li>
            <li>L’amélioration de nos services via des statistiques anonymisées</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            2. Utilisation des données
          </h2>
          <p>
            Les informations collectées sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc list-inside">
            <li>Traiter vos réservations et paiements</li>
            <li>Répondre à vos demandes et support client</li>
            <li>Vous envoyer des informations concernant nos services, promotions et nouveautés</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            3. Partage des données
          </h2>
          <p>
            Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées uniquement avec :
          </p>
          <ul className="list-disc list-inside">
            <li>Nos partenaires de paiement sécurisés (Stripe, PayPal, etc.)</li>
            <li>Nos prestataires techniques nécessaires au fonctionnement de la plateforme</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            4. Sécurité des données
          </h2>
          <p>
            Nous utilisons des mesures techniques et organisationnelles adaptées pour protéger vos informations contre tout accès non autorisé, perte, modification ou divulgation.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            5. Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside">
            <li>Accès à vos données personnelles</li>
            <li>Correction ou suppression de vos données</li>
            <li>Limitation du traitement ou opposition</li>
            <li>Portabilité des données</li>
            <li>Retrait du consentement à tout moment</li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous à l’adresse : <span className="text-[#F5A623]">privacy@escapegame.com</span>.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            6. Cookies
          </h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience utilisateur, analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences via votre navigateur.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            7. Modifications de la politique
          </h2>
          <p>
            Cette politique peut être mise à jour à tout moment. Les modifications seront publiées sur cette page et entreront en vigueur immédiatement après publication.
          </p>
        </section>
      </main>

    </div>
  );
}

export default PageRGPD;
