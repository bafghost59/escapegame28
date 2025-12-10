import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function createStripeCheckoutSession({
  bookingId,
  total,
  escapeTitle,
}) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await axios.post(
    `${API_BASE_URL}/payments/stripe/checkout-session`,
    { bookingId, total, escapeTitle },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { url }
}





