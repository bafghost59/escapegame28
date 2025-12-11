import axios from "axios";

// Fonction pour récupérer les détails des réservations (page admin)
function fetchPageAdmin() {
     // Effectue une requête GET vers l'API locale pour obtenir les détails des bookings
    return axios.get("http://localhost:3000/api/bookings/details");
}

// Export par défaut d'un objet contenant la fonction fetchPageAdmin
// Cela permet de l'importer facilement dans d'autres fichiers
export default {fetchPageAdmin};    