// src/Services/PageCatalogue.js

// URL de base -> note le /api
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function getAllEscapes() {
  const response = await fetch(`${API_BASE_URL}/escapes/with-ratings`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des escapes");
  }

  return response.json();
}

export async function getEscapeById(id) {
  const response = await fetch(`${API_BASE_URL}/escapes/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'escape");
  }

  return response.json();
}



