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
  try {
    const response = await axios.post(
      `${API_BASE_URL}/addbooking`,
      {
        date_booking,
        hours_selected,
        status,
        user_id,
        escape_id,
      }
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Erreur lors de la création de la réservation";
    throw new Error(message);
  }
}


export async function getAvailableSlots({ escape_id, date }) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/bookings/availability`,
      {
        params: {
          escapeId: escape_id,
          date,             // format 'YYYY-MM-DD'
        },
      }
    );
    return response.data.slots; // ["10:00", "14:00", ...]
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Erreur lors du chargement des créneaux disponibles';
    throw new Error(message);
  }
}


