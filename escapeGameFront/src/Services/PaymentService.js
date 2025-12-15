import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const api = axios.create({ baseURL: API_BASE_URL });

function toServiceError(error, fallbackMessage) {
  return new Error(
    error?.response?.data?.message || error?.message || fallbackMessage
  );
}

function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifiǸ");
  return token;
}

export async function createStripeCheckoutSession({
  bookingId,
  total,
  escapeTitle,
  promoCode,
}) {
  try {
    const token = getAuthToken();
    const { data } = await api.post(
      "/payments/stripe/checkout-session",
      { bookingId, total, escapeTitle, promoCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw toServiceError(
      error,
      "Erreur lors de la crǸation de la session Stripe"
    );
  }
}

export async function validatePromo({ total, promoCode }) {
  try {
    const token = getAuthToken();
    const { data } = await api.post(
      "/payments/validate-promo",
      { total, promoCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors de la validation du code promo");
  }
}
