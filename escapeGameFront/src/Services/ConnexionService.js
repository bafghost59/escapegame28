import axios from "axios"; // Import de la librairie axios pour effectuer des requêtes HTTP


function ConnexionUser(login, password) {
    
    // Effectue une requête POST vers l'API de connexion
    // L'URL "http://localhost:3000/api/login" correspond au serveur local
    // Les données envoyées sont un objet contenant le login et le password
    return axios.post("http://localhost:3000/api/login", {
        login,
        password
    })


}

// Export par défaut d'un objet contenant la fonction ConnexionUser
// Cela permet d'importer la fonction plus facilement dans d'autres fichiers
export default {ConnexionUser};