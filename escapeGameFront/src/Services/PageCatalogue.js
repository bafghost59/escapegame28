import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const api = axios.create({ baseURL: API_BASE_URL });

function toServiceError(error, fallbackMessage) {
  return new Error(
    error?.response?.data?.message || error?.message || fallbackMessage
  );
}

export async function getAllEscapes() {
  try {
    const { data } = await api.get("/escapes/with-ratings");
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors du chargement des escapes");
  }
}

export async function getEscapeById(id) {
  try {
    const { data } = await api.get(`/escapes/${id}`);
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors du chargement de l'escape");
  }
}

