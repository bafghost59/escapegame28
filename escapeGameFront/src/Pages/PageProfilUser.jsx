import { useState } from "react";
import BookingsList from "../Components/BookingsList.jsx";

import SidebarClient from "../Components/Sidebar.jsx";
import ProfilList from "../Components/ProfilList.jsx";
import { HiMenu } from "react-icons/hi";
import InvoicesList from "../Components/InvoicesList.jsx";
import Documentation from "../Components/Documentation.jsx";

export default function PageProfilUser({user, setIsLoggedIn, setUser}) {
  const [ongletActif, setOngletActif] = useState("reservations");                                            // état crée avec un onglet par défaut - setOngletActif qui va permettre de changer selon le souhait de l'user
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);                                         // état booléen qui permet l'apparition du menu mobile
  const [showModal, setShowModal] = useState(false);                                                         // état booléen qui permet l'apparition de la modal

  let contenu;
  if (ongletActif === "profil") {
    contenu = <ProfilList />;
  } else if (ongletActif === "reservations") {
    contenu = <BookingsList />;
  }  else if (ongletActif === "invoices") {                                                                    // Création d'une variable qui va changer au clic - renvoi vers onglet correspondant
  contenu = <InvoicesList />;
} else if (ongletActif === "documentation") {
  contenu = <Documentation show={showModal} onClose={() => setShowModal(false)} />;
}

const HandleOpenDocumentation = async () => {
    setShowModal(true);                                                                                         // Modal avec la documentation - CGU et RGPD
  

}

  return (
    <div className="flex min-h-screen text-slate-50">

      <SidebarClient
        ongletActif={ongletActif}
        setOngletActif={setOngletActif}                                                                        // Tous les props initiés ici son récupérés ensuite dans le composant
        openMobile={openMobileSidebar}
        setOpenMobile={setOpenMobileSidebar}
          setIsLoggedIn={setIsLoggedIn}
  setUser={setUser}
  onOpenDoc={HandleOpenDocumentation}
      />


      <div className="flex flex-1 min-h-screen flex-col">

        <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpenMobileSidebar(true)}
            className="inline-flex items-center justify-center rounded-md bg-transparent p-1 text-slate-200 hover:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          <span className="text-base font-semibold">Espace client</span>
        </header>

        {/* CONTENU : prend tout l'espace restant, scrollable si besoin */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6">
          {contenu}
        </main>
      </div>
    </div>
  );
}



 
