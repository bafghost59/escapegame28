
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {  HiInbox, HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi";
import { MdFeedback } from "react-icons/md";




export default function SidebarClient ({ongletActif, setOngletActif})  {







  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-xs bg- shadow-2xl md:w-64">
        <Sidebar aria-label="Espace client sidebar" className="h-full">
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem  icon={HiInbox} onClick={() => setOngletActif("Notifications")}>
                Notifications
              </SidebarItem>
              <SidebarItem  icon={HiUser} onClick={() => setOngletActif("Profil")}>
                Profil
              </SidebarItem>
              <SidebarItem  icon={HiShoppingBag} onClick={() => setOngletActif("Reservations")}>
                Mes Réservations
              </SidebarItem>
              <SidebarItem  icon={MdFeedback} onClick={() => setOngletActif("Avis")}>
                Mes avis
              </SidebarItem>
            </SidebarItemGroup>
            <SidebarItemGroup>
              <SidebarItem  icon={HiViewBoards}>
                Documentation
              </SidebarItem>
              <SidebarItem  icon={BiBuoy}>
                Aide
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>


      <main className="flex flex-1 p-4 md:p-8 justify-center text-center">

      </main>
    </div>
  );
}

