import axios from "axios";

// Envoi du message support
function sendSupportMessage({ user_id, booking_id = null, subject, message }) {
    // Effectue une requête POST vers l'API locale pour envoyer le message
    return axios.post("http://localhost:3000/api/support", {
        user_id,
        booking_id,
        subject,
        message
    })
    .then(res => res.data) // Récupère uniquement les données renvoyées par l'API
    .catch(err => { // Gestion d'erreur
        // Affiche l'erreur dans la console, soit la réponse du serveur, soit le message d'erreur
        console.error("Erreur API Support :", err.response || err.message);
        // Relance l'erreur pour pouvoir la gérer côté composant
        throw err;
    });
}
// Export par défaut d'un objet contenant la fonction sendSupportMessage
export default { sendSupportMessage };
