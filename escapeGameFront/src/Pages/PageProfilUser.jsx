import { useState } from "react";
import  BookingsList  from "../Components/BookingsList.jsx";
import  FeedbackList  from "../Components/FeedbackList.jsx";
import Profil from "../Components/Profil.jsx";
import SidebarClient from "../Components/Sidebar.jsx";



export default function PageProfilUser () {
    const [ongletActif, setOngletActif] = useState("Reservations"); 


    let contenu;

      if (ongletActif === "profil") {
    contenu = <Profil />;         
  } else if (ongletActif === "notifications") {
    contenu = <Notiications />;   
  } else if (ongletActif === "Reservations") {
    contenu = <BookingsList />;           
  } else if (ongletActif === "avis") {
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
 
