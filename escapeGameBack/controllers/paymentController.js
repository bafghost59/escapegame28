import Stripe from "stripe";
import {
  getAllPayments,
  getAllPaymentsWithBooking,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../models/paymentModel.js";
import { findActivePromoByCode } from "../models/promoCodeModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAllPaymentsWithBookingController = async (req, res) => {
  try {
    const payments = await getAllPaymentsWithBooking();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getPaymentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await getPaymentById(id);

    if (!payment) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createPaymentController = async (req, res) => {
  try {
    const { total_payment, date_payment, mode_payment, booking_id } = req.body;

    if (!total_payment || !date_payment || !mode_payment || !booking_id) {
      return res.status(400).json({
        message:
          "total_payment, date_payment, mode_payment, booking_id sont requis",
      });
    }

    const result = await createPayment({
      total_payment,
      date_payment,
      mode_payment,
      booking_id,
    });

    res.status(201).json({
      message: "Paiement créé",
      id_payment: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updatePaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_payment, date_payment, mode_payment, booking_id } = req.body;

    const result = await updatePayment(id, {
      total_payment,
      date_payment,
      mode_payment,
      booking_id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.json({ message: "Paiement mis à jour" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deletePaymentController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletePayment(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.json({ message: "Paiement supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { bookingId, total, escapeTitle, promoCode } = req.body;

    if (!bookingId || typeof total === "undefined") {
      return res
        .status(400)
        .json({ message: "bookingId et total sont requis" });
    }

    const baseTotal = Number(total);
    if (Number.isNaN(baseTotal) || baseTotal <= 0) {
      return res
        .status(400)
        .json({ message: "Montant total invalide pour le paiement" });
    }

    let finalTotal = baseTotal;
    let appliedDiscount = 0;

    if (promoCode) {
      const promo = await findActivePromoByCode(promoCode.trim());

      if (!promo) {
        return res
          .status(400)
          .json({ message: "Code promo invalide ou expiré" });
      }

      if (promo.discount_type === "percent") {
        appliedDiscount = (baseTotal * promo.discount_value) / 100;
      } else {
        appliedDiscount = promo.discount_value;
      }

      finalTotal = Math.max(0, baseTotal - appliedDiscount);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: escapeTitle || `Réservation escape game #${bookingId}`,
            },
            unit_amount: Math.round(finalTotal * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: String(bookingId),
        promoCode: promoCode || "",
        discount: appliedDiscount.toString(),
      },
      success_url: `${process.env.FRONT_URL}/reservation/${bookingId}/confirmation?payment=success&total=${encodeURIComponent(
        finalTotal
      )}&title=${encodeURIComponent(escapeTitle || "")}`,
      cancel_url: `${process.env.FRONT_URL}/reservation/${bookingId}/paiement?canceled=true`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur Stripe" });
  }
};

export const validatePromoController = async (req, res) => {
  try {
    const { total, promoCode } = req.body;

    const baseTotal = Number(total);
    if (Number.isNaN(baseTotal) || baseTotal < 0) {
      return res.status(400).json({ message: "Montant total invalide" });
    }

    // Pas de code => pas de remise, mais on renvoie quand même le total
    if (!promoCode || !promoCode.trim()) {
      return res.json({
        finalTotal: baseTotal,
        discount: 0,
      });
    }

    const promo = await findActivePromoByCode(promoCode.trim());

    if (!promo) {
      return res
        .status(400)
        .json({ message: "Code promo invalide ou expiré" });
    }

    let discount = 0;
    if (promo.discount_type === "percent") {
      discount = (baseTotal * promo.discount_value) / 100;
    } else {
      discount = promo.discount_value;
    }

    const finalTotal = Math.max(0, baseTotal - discount);

    return res.json({
      finalTotal,
      discount,
      discountType: promo.discount_type,
      discountValue: promo.discount_value,
      code: promo.code,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

