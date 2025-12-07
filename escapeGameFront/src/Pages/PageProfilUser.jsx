import { useState } from "react";
import  BookingsList  from "../Components/BookingsList.jsx";
import  FeedbackList  from "../Components/FeedbackList.jsx";

import SidebarClient from "../Components/Sidebar.jsx";
import ProfilList from "../Components/ProfilList.jsx";
import ProfilUser from "../Components/Profil.jsx";
import Notifications from '../Components/Notifications.jsx'



export default function PageProfilUser () {
    const [ongletActif, setOngletActif] = useState("Reservations"); 


    let contenu;

      if (ongletActif === "Profil") {
    contenu = <ProfilList />;         
  } else if (ongletActif === "Notifications") {
    contenu = <Notiications />;   
  } else if (ongletActif === "Reservations") {
    contenu = <BookingsList />;           
  } else if (ongletActif === "Avis") {
    contenu = <FeedbackList />;      
  }
    
    
    
    
    return ( <>


   
   
<div className="flex min-h-screen">
<SidebarClient ongletActif={ongletActif} setOngletActif={setOngletActif} />
      <main className="flex-1 p-4 md:p-8">
        {contenu}
      </main>
</div>
    </>);
}
 
