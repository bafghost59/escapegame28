// src/Pages/PageReservationTwo.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createStripeCheckoutSession } from "../Services/PaymentService";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Si price_escape est le prix par joueur :
  const total = Number(players) * Number(price_escape || 0);

  async function handlePay(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { url } = await createStripeCheckoutSession({
        bookingId,
        total,
        escapeTitle: `Escape game #${escapeId}`,
      });

      window.location.href = url; // redirection vers Stripe
    } catch (err) {
      console.error(err);
      setError(err.message || "Erreur lors de la redirection vers Stripe.");
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
            <span className="font-semibold text-white">{total} €</span>
          </p>
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
            <label className="text-xs text-[#CCCCCC]">
              Paiement sécurisé
            </label>
            <select
              value="CB"
              disabled
              className="w-full rounded-md bg-[#1E1E2F] border border-[#F5A623] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="CB">Carte bancaire (via Stripe)</option>
            </select>
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


