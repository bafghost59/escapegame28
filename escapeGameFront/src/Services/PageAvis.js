// src/Services/PageAvis.js
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function getFeedbacksByEscapeId(id) {
  const res = await fetch(`${API_BASE_URL}/feedbacks/escape/${id}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des avis");
  return res.json();
}

export async function getFeedbackStatsByEscapeId(id) {
  const res = await fetch(`${API_BASE_URL}/feedbacks/escape/${id}/stats`);
  if (!res.ok) throw new Error("Erreur lors du chargement des statistiques d'avis");
  return res.json();
}

export async function createFeedback({ rated, rating, escape_id, user_id, token }) {
  const res = await fetch(`${API_BASE_URL}/feedbacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rated, rating, escape_id, user_id }),
  });

  if (!res.ok) {
    let errorMessage = "Erreur lors de l'envoi de l'avis";
    try {
      const data = await res.json();
      if (data?.message) errorMessage = data.message;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
