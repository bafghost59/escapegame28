const PageApropos = () => {
  return (
    <div className="min-h-screen bg-[#1E1E2F] text-[#FFFFFF] px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5A623]">
          À propos de notre projet Escape Game
        </h1>

        <p className="text-lg md:text-xl leading-relaxed">
          Bienvenue sur notre plateforme dédiée aux <strong>escape games à domicile et sur site</strong>.
          Ce projet est réalisé dans le cadre de notre formation Développeur Web et Mobile. 
          L’objectif est de créer une expérience immersive, intuitive et accessible à tous.
        </p>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Notre mission</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Centraliser la gestion complète des escape games</li>
            <li>Automatiser les réservations, plannings et paiements</li>
            <li>Offrir une expérience fluide pour les joueurs</li>
            <li>Fournir des outils d’administration performants</li>
            <li>Créer une interface immersive et engageante</li>
          </ul>
        </section>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Pour qui ?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Administrateurs :</strong> gestion du catalogue, plannings et avis</li>
            <li><strong>Utilisateurs :</strong> réservation, paiement et participation aux escape games</li>
          </ul>
        </section>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Fonctionnalités clés</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Catalogue détaillé avec photos, vidéos et filtres avancés</li>
            <li>Réservations en 3 étapes : choix - créneau - paiement</li>
            <li>Paiements sécurisés : Stripe</li>
            <li>Planning interactif et notifications email/SMS</li>
            <li>Système d’avis</li>
          </ul>
        </section>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Design & Expérience</h2>
          <p>
            L’interface est pensée pour être immersive et cohérente : ambiance sombre et mystérieuse,
            touches dynamiques pour les actions, typographies modernes (Montserrat pour les titres, Open Sans pour le texte).
          </p>
        </section>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Sécurité & Performance</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Architecture : React.js + Node.js + MySQL</li>
            <li>Sécurité : HTTPS, JWT, Bcrypt, conformité RGPD</li>
            <li>Temps de chargement inférieur à 3 secondes</li>
          </ul>
        </section>

        <section className="bg-[#2C2C3A] p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#F5A623]">Notre vision</h2>
          <p>
            Nous prévoyons d’enrichir la plateforme avec une application mobile native, des escape games en réalité augmentée. 
            L’objectif est de rendre l’expérience immersive, accessible et innovante.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PageApropos;
