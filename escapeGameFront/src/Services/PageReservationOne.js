import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const api = axios.create({ baseURL: API_BASE_URL });

function toServiceError(error, fallbackMessage) {
  return new Error(
    error?.response?.data?.message || error?.message || fallbackMessage
  );
}

export async function createBooking({
  date_booking,
  hours_selected,
  escape_id,
  user_id,
  status = "en attente",
}) {
  try {
    const { data } = await api.post("/addbooking", {
      date_booking,
      hours_selected,
      status,
      user_id,
      escape_id,
    });
    return data;
  } catch (error) {
    throw toServiceError(error, "Erreur lors de la crǸation de la rǸservation");
  }
}

export async function getAvailableSlots({ escape_id, date }) {
  try {
    const { data } = await api.get("/bookings/availability", {
      params: {
        escapeId: escape_id,
        date,
      },
    });
    return data.slots;
  } catch (error) {
    throw toServiceError(
      error,
      "Erreur lors du chargement des crǸneaux disponibles"
    );
  }
}
