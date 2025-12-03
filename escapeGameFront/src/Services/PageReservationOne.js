// src/Services/PageReservationOne.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function createBooking({
  date_booking,
  hours_selected,
  escape_id,
  user_id,
  status = "en attente",
}) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings`,
      {
        date_booking,
        hours_selected,
        status,
        user_id,
        escape_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // axios met la réponse dans response.data
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Erreur lors de la création de la réservation";
    throw new Error(message);
  }
}

