import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi";
import { MdFeedback } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";

export default function SidebarClient({
  ongletActif,
  setOngletActif,
  openMobile,
  setOpenMobile, setIsLoggedIn, setUser
}) {
  const navigate = useNavigate();
  const handleSelect = (onglet) => {
    setOngletActif(onglet);
    setOpenMobile(false);
  };

       const handleLogout = () => {
    
    localStorage.removeItem("account_id");
    localStorage.removeItem("user_id");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/connexion"); 
  };

  const sidebarContent = (
    <Sidebar
      aria-label="Espace client sidebar"
      className="h-full w-full bg-transparent"
    >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            icon={HiUser}
            onClick={() => handleSelect("profil")}
            className={`cursor-pointer ${
              ongletActif === "profil"
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800/70"
            }`}
          >
            Profil
          </SidebarItem>

          <SidebarItem
            icon={HiShoppingBag}
            onClick={() => handleSelect("reservations")}
            className={`cursor-pointer ${
              ongletActif === "reservations"
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800/70"
            }`}
          >
            Mes réservations
          </SidebarItem>

          <SidebarItem
            icon={MdFeedback}
            onClick={() => handleSelect("avis")}
            className={`cursor-pointer ${
              ongletActif === "avis"
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800/70"
            }`}
          >
            Mes avis
          </SidebarItem>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            icon={HiViewBoards}
            className="cursor-pointer hover:bg-slate-800/70"
          >
            Documentation
          </SidebarItem>
          <SidebarItem
            icon={CiLogout}
            className="cursor-pointer hover:bg-slate-800/70 "
            onClick={() => handleLogout()}
          >
            Se déconnecter
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );

  return (
    <>
      {/* Sidebar fixe desktop */}
      <aside className="hidden h-screen w-64 border-r border-slate-800 bg-slate-900/90 text-slate-100 md:block">
        <div className="h-full">{sidebarContent}</div>
      </aside>

      {/* Drawer mobile */}
      {openMobile && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Fond sombre */}
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpenMobile(false)}
          />

          {/* Panneau latéral */}
          <div className="relative z-50 flex h-full w-64 flex-col bg-slate-900 text-slate-100 shadow-xl">
            <div className="border-b border-slate-800 px-4 py-3">
              <h2 className="text-base font-semibold">Menu</h2>
            </div>

            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>

            {/* Bouton fermer rouge en bas */}
            <div className="border-t border-slate-800 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="w-full rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
