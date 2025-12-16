import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const api = axios.create({ baseURL: API_BASE_URL });

function toServiceError(error, fallbackMessage) {
  return new Error(
    error?.response?.data?.message || error?.message || fallbackMessage
  );
}

export async function getFeedbacksByEscapeId(id) {
  try {
    const { data } = await api.get(`/feedbacks/escape/${id}`);
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors du chargement des avis");
  }
}

export async function getFeedbackStatsByEscapeId(id) {
  try {
    const { data } = await api.get(`/feedbacks/escape/${id}/stats`);
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors du chargement des statistiques d'avis");
  }
}

export async function createFeedback({ rated, rating, escape_id, user_id, token }) {
  try {
    const { data } = await api.post(
      "/feedbacks",
      { rated, rating, escape_id, user_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors de l'envoi de l'avis");
  }
}
