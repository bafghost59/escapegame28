// src/Pages/PageReservationTwo.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createStripeCheckoutSession,
  validatePromo,
} from "../Services/PaymentService";

export default function PageReservationTwo() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  // Si quelqu'un arrive directement sans passer par l'étape 1
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-white">
          Aucune réservation à payer. Retournez au catalogue.
        </p>
      </div>
    );
  }

  const {
    bookingId,
    escapeId,
    date,
    time,
    players,
    price_escape, // passé depuis PageReservationOne
  } = bookingData;

  // Prix de base (prix par joueur * nb joueurs)
  const total = Number(players) * Number(price_escape || 0);

  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [displayTotal, setDisplayTotal] = useState(total);
  const [discount, setDiscount] = useState(0);

  async function handleApplyPromo(e) {
    e.preventDefault();
    setError(null);
    setPromoLoading(true);

    try {
      const data = await validatePromo({ total, promoCode });
      setDisplayTotal(data.finalTotal);
      setDiscount(data.discount);
    } catch (err) {
      console.error(err);
      setDiscount(0);
      setDisplayTotal(total);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de la validation du code promo."
      );
    } finally {
      setPromoLoading(false);
    }
  }

  async function handlePay(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { url } = await createStripeCheckoutSession({
        bookingId,
        total, // montant de base; le back recalcule avec le code promo
        escapeTitle: `Escape game #${escapeId}`,
        promoCode: promoCode || null,
      });

      window.location.href = url; // redirection vers Stripe
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de la redirection vers Stripe."
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#1E1E2F] text-[#EAEAEA] px-8 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Stepper */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CCCCCC] text-xs">
              1
            </span>
            <span>Choix du créneau</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5A623] text-white text-xs font-bold">
              2
            </span>
            <span>Paiement</span>
          </div>
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CCCCCC] text-xs">
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Étape 2 – Paiement
          </h1>
          <p className="text-sm text-[#EAEAEA]">
            Vérifiez les détails de votre réservation puis validez le paiement
            par carte bancaire.
          </p>
        </div>

        {/* Récap réservation */}
        <div className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] p-4 text-sm space-y-1">
          <p>Date : {date}</p>
          <p>Horaire : {time}</p>
          <p>Nombre de joueurs : {players}</p>
          <p>Prix par joueur : {price_escape} €</p>
          <p className="mt-2">
            Total :{" "}
            {discount > 0 ? (
              <>
                <span className="font-semibold text-white line-through mr-2">
                  {total} €
                </span>
                <span className="font-semibold text-[#F5A623]">
                  {displayTotal} €
                </span>
              </>
            ) : (
              <span className="font-semibold text-white">
                {displayTotal} €
              </span>
            )}
          </p>
          {discount > 0 && (
            <p className="text-xs text-green-400">
              Réduction appliquée : -{discount.toFixed(2)} €
            </p>
          )}
        </div>

        {/* Formulaire paiement */}
        <form
          onSubmit={handlePay}
          className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-white mb-2">
            Mode de paiement
          </h2>

          <div className="space-y-1">
            <label className="text-xs text-[#CCCCCC]">Paiement sécurisé</label>
            <select
              value="CB"
              disabled
              className="w-full rounded-md bg-[#1E1E2F] border border-[#F5A623] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="CB">Carte bancaire (via Stripe)</option>
            </select>
          </div>

          {/* Code promo */}
          <div className="space-y-1">
            <label className="text-xs text-[#CCCCCC]">Code promo</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Saisissez votre code promo"
                className="flex-1 rounded-md bg-[#1E1E2F] border border-[#4A90E2] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={promoLoading}
                className="rounded-md bg-[#F5A623] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {promoLoading ? "Application..." : "Appliquer"}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 rounded-md bg-[#4A90E2] py-2 text-sm font-semibold text-white hover:bg-[#357ABD] transition-colors"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-[#F5A623] py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Paiement en cours..." : "Payer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




