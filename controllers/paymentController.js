
import {
  getAllPayments,
  getAllPaymentsWithBooking,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from '../models/paymentModel.js';


export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getAllPaymentsWithBookingController = async (req, res) => {
  try {
    const payments = await getAllPaymentsWithBooking();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getPaymentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await getPaymentById(id);

    if (!payment) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const createPaymentController = async (req, res) => {
  try {
    const {
      total_payment,
      date_payment,
      mode_payment,
      booking_id,
    } = req.body;

    if (!total_payment || !date_payment || !mode_payment || !booking_id) {
      return res
        .status(400)
        .json({ message: 'total_payment, date_payment, mode_payment, booking_id sont requis' });
    }

    const result = await createPayment({
      total_payment,
      date_payment,
      mode_payment, // doit être une valeur de l’ENUM
      booking_id,
    });

    res.status(201).json({
      message: 'Paiement créé',
      id_payment: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const updatePaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      total_payment,
      date_payment,
      mode_payment,
      booking_id,
    } = req.body;

    const result = await updatePayment(id, {
      total_payment,
      date_payment,
      mode_payment,
      booking_id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    res.json({ message: 'Paiement mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const deletePaymentController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletePayment(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    res.json({ message: 'Paiement supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
