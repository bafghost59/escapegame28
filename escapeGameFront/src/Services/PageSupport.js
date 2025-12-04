import axios from "axios";

// Envoi du message support
function sendSupportMessage({ user_id, booking_id = null, subject, message }) {
    return axios.post("http://localhost:3000/support", {
        user_id,
        booking_id,
        subject,
        message
    })
    .then(res => res.data)
    .catch(err => {
        console.error("Erreur API Support :", err.response || err.message);
        throw err;
    });
}

export default { sendSupportMessage };
