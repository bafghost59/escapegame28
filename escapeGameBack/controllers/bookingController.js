
import {
  getAllBookings,
  getAllBookingsWithDetails,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  checkAvailability,
} from '../models/bookingModel.js';


export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getAllBookingsWithDetailsController = async (req, res) => {
  try {
    const bookings = await getAllBookingsWithDetails();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getBookingByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const createBookingController = async (req, res) => {
  try {
    const {
      date_booking,
      hours_selected,
      status,     // optionnel, par défaut dans le model = 'en attente'
      user_id,
      escape_id,
    } = req.body;

    if (!date_booking || !hours_selected || !user_id || !escape_id) {
      return res
        .status(400)
        .json({ message: 'date_booking, hours_selected, user_id, escape_id sont requis' });
    }

  const alreadyTaken = await checkAvailability(hours_selected, escape_id);

if (alreadyTaken) {
  return res.status(409).json({ message: "Créneau déjà réservé" });
}

    const result = await createBooking({
      date_booking,
      hours_selected,
      status,
      user_id,
      escape_id,
    });

    res.status(201).json({
      message: 'Réservation créée',
      id_booking: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const updateBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date_booking,
      hours_selected,
      status,
      user_id,
      escape_id,
    } = req.body;

    const result = await updateBooking(id, {
      date_booking,
      hours_selected,
      status,
      user_id,
      escape_id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json({ message: 'Réservation mise à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const deleteBookingController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBooking(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
