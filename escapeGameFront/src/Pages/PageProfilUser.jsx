import { useState } from "react";
import BookingsList from "../Components/BookingsList.jsx";
import FeedbackList from "../Components/FeedbackList.jsx";
import SidebarClient from "../Components/Sidebar.jsx";
import ProfilList from "../Components/ProfilList.jsx";
import { HiMenu } from "react-icons/hi";
import InvoicesList from "../Components/InvoicesList.jsx";
import Documentation from "../Components/Documentation.jsx";

export default function PageProfilUser({user, setIsLoggedIn, setUser}) {
  const [ongletActif, setOngletActif] = useState("reservations");
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let contenu;
  if (ongletActif === "profil") {
    contenu = <ProfilList />;
  } else if (ongletActif === "reservations") {
    contenu = <BookingsList />;
  }  else if (ongletActif === "invoices") {
  contenu = <InvoicesList />;
} else if (ongletActif === "documentation") {
  contenu = <Documentation show={showModal} onClose={() => setShowModal(false)} />;
}

const HandleOpenDocumentation = async () => {
    setShowModal(true);
  

}

  return (
    <div className="flex min-h-screen text-slate-50">

      <SidebarClient
        ongletActif={ongletActif}
        setOngletActif={setOngletActif}
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



 
