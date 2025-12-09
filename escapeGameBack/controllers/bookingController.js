
import {
  getAllBookings,
  getAllBookingsWithDetails,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  checkAvailability,
  getBookingsByUserId,
  getBookedSlotsForEscapeAndDate,
} from '../models/bookingModel.js';

import {
  getAllActivePolicies,
  getPolicyForEscapeAndDelay,
} from "../models/CancellationPolicyModel.js";



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

export const getAvailableSlotsController = async (req, res) => {
  try {
    const { escapeId, date } = req.query;

    if (!escapeId || !date) {
      return res
        .status(400)
        .json({ message: 'escapeId et date sont requis' });
    }

    // récupère les créneaux déjà pris en BDD pour cette date / escape
    const bookedSlots = await getBookedSlotsForEscapeAndDate(escapeId, date);

    // définition des créneaux possibles dans la journée
    const allSlots = ['10:00', '14:00', '16:30', '19:00'];

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    return res.json({ slots: availableSlots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
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

export const getAllBookingsByAccountIdController = async (req, res) => {
  try {
    const { id_account } = req.params;
    const bookingsAccountId = await getBookingsByUserId(id_account);
    res.json(bookingsAccountId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getCancellationPoliciesController = async (req, res) => {
  try {
    const policies = await getAllActivePolicies();
    res.json(policies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getCancellationInfoForBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    const now = new Date();
    const sessionDate = new Date(booking.hours_selected);
    const diffMs = sessionDate - now;
    const hoursBefore = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

    const policy = await getPolicyForEscapeAndDelay(
      booking.escape_id,
      hoursBefore
    );

    if (!policy) {
      return res.json({
        canCancel: false,
        refundPercent: 0,
        hoursBefore,
      });
    }

    return res.json({
      canCancel: policy.refund_percent > 0,
      refundPercent: policy.refund_percent,
      hoursBefore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
