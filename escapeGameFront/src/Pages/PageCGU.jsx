
function PageCGU() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E2F] text-[#EAEAEA]">
     

      {/* Contenu principal */}
      <main className="flex-1 px-6 md:px-16 py-12">
        <h1 className="font-montserrat font-bold text-[36px] text-white mb-6">
          Conditions Générales d'Utilisation (CGU)
        </h1>

        <section className="space-y-6 text-[16px] md:text-[18px]">
          <p>
            Bienvenue sur notre plateforme de gestion d’Escape Games à domicile
            et sur site. En utilisant notre site, vous acceptez les présentes
            Conditions Générales d’Utilisation.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            1. Objet
          </h2>
          <p>
            Les présentes CGU ont pour objet de définir les conditions dans
            lesquelles les utilisateurs accèdent et utilisent la plateforme,
            ainsi que les droits et obligations des parties.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            2. Accès et inscription
          </h2>
          <p>
            L’accès à la plateforme est réservé aux utilisateurs disposant d’un
            compte valide. L’inscription implique la fourniture de données exactes
            et à jour. L’utilisateur est responsable de la confidentialité de
            ses identifiants.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            3. Réservation et paiement
          </h2>
          <p>
            Les réservations se font via le processus en ligne. Les paiements sont
            sécurisés et peuvent être effectués par Stripe, PayPal, Apple Pay ou
            Google Pay. Toute annulation ou modification doit respecter la
            politique définie sur le site.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            4. Responsabilités
          </h2>
          <p>
            La plateforme n’est pas responsable des dommages directs ou indirects
            résultant de l’utilisation des services. L’utilisateur s’engage à
            respecter les règles de sécurité lors de la participation aux
            escape games.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            5. Propriété intellectuelle
          </h2>
          <p>
            Tous les contenus présents sur le site (textes, images, vidéos,
            logos) sont protégés par les droits d’auteur et ne peuvent être
            reproduits sans autorisation.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            6. Protection des données
          </h2>
          <p>
            Nous collectons uniquement les données nécessaires à la gestion des
            réservations et à l’amélioration des services. Les informations
            personnelles sont traitées conformément au RGPD.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            7. Modifications des CGU
          </h2>
          <p>
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les
            utilisateurs seront informés des changements et leur utilisation
            continue de la plateforme vaut acceptation des nouvelles CGU.
          </p>

          <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
            8. Contact
          </h2>
          <p>
            Pour toute question relative aux CGU, vous pouvez nous contacter via
            la page “Contact” ou envoyer un email à support@escapegame.com.
          </p>
        </section>
      </main>

    </div>
  );
}

export default PageCGU;
