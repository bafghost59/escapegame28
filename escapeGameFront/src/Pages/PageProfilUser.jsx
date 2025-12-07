import { useState } from "react";
import BookingsList from "../Components/BookingsList.jsx";
import FeedbackList from "../Components/FeedbackList.jsx";
import SidebarClient from "../Components/Sidebar.jsx";
import ProfilList from "../Components/ProfilList.jsx";
import { HiMenu } from "react-icons/hi";

export default function PageProfilUser() {
  const [ongletActif, setOngletActif] = useState("reservations");
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  let contenu;
  if (ongletActif === "profil") {
    contenu = <ProfilList />;
  } else if (ongletActif === "reservations") {
    contenu = <BookingsList />;
  } else if (ongletActif === "avis") {
    contenu = <FeedbackList />;
  }

  return (
    <div className="flex min-h-screen  text-slate-50">
      {/* Sidebar desktop + drawer mobile */}
      <SidebarClient
        ongletActif={ongletActif}
        setOngletActif={setOngletActif}
        openMobile={openMobileSidebar}
        setOpenMobile={setOpenMobileSidebar}
      />

      {/* Colonne principale qui occupe 100% de la hauteur */}
      <div className="flex flex-1 min-h-screen flex-col w-screen">
        {/* HEADER MOBILE : burger à gauche + texte */}
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

        {/* Contenu qui prend le reste de la hauteur */}
        <main className="flex-1 p-6 md:p-6 overflow-y-auto">
          {contenu}
        </main>
      </div>
    </div>
  );
}


 
