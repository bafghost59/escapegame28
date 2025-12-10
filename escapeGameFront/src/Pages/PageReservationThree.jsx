// src/Pages/PageReservationThree.jsx
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import PageProfilService from "../Services/PageProfilService.js";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export default function PageReservationThree() {
  const navigate = useNavigate();
  const { id } = useParams(); // ici :id = bookingId
  const [searchParams] = useSearchParams();

  const paymentStatus = searchParams.get("payment");
  const total = searchParams.get("total") || "0";
  const title = decodeURIComponent(searchParams.get("title") || "");
  const isSuccess = paymentStatus === "success";

  const [cancellationInfo, setCancellationInfo] = useState(null);
  const [policyError, setPolicyError] = useState(null);
  const [policyLoading, setPolicyLoading] = useState(true);

  useEffect(() => {
    async function fetchCancellationInfo() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setPolicyError(
            "Connectez-vous pour voir les conditions d'annulation de cette réservation."
          );
          return;
        }

        const res = await axios.get(
          `${API_BASE_URL}/bookings/${id}/cancellation-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCancellationInfo(res.data);
      } catch (err) {
        console.error(err);
        setPolicyError(
          "Impossible de récupérer les conditions d'annulation pour le moment."
        );
      } finally {
        setPolicyLoading(false);
      }
    }

    if (id) {
      fetchCancellationInfo();
    }
  }, [id]);

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Facture - Escape Game", 20, 20);

    doc.setFontSize(12);
    doc.text(`N° de réservation : ${id}`, 20, 35);
    doc.text(
      `Statut du paiement : ${isSuccess ? "Confirmé" : "Inconnu"}`,
      20,
      42
    );

    if (title) {
      doc.text(`Escape game : ${title}`, 20, 55);
    }

    doc.text(`Montant payé : ${total} €`, 20, 62);

    doc.text(
      "Merci pour votre réservation. Conservez ce document comme justificatif.",
      20,
      80,
      { maxWidth: 170 }
    );

    doc.save(`facture-reservation-${id}.pdf`);

  };
  
  const confirmPaymentStatus = async () => {
console.log("confirmPaymentStatus lancé avec", id, paymentStatus);
    try {
      if (id && paymentStatus === "success") {
        await PageProfilService.confirmPayment(id);
        console.log("appel API fait");
      } 
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paiement", error);
    } 
  }

useEffect(() => {
  console.log("useEffect confirmPaymentStatus appelé");
  confirmPaymentStatus();
}, [id, paymentStatus]);


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
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CCCCCC] text-xs">
              2
            </span>
            <span>Paiement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4CAF50] text-white text-xs font-bold">
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Étape 3 – Confirmation
          </h1>
          <p className="text-sm text-[#EAEAEA]">
            Merci pour votre réservation !
          </p>
        </div>

        {/* Bloc confirmation / résumé */}
        <div className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] p-6 space-y-3 text-sm">
          <p className="text-lg font-semibold text-white">
            Réservation n° {id}
          </p>

          <p>
            Statut du paiement :{" "}
            <span className={isSuccess ? "text-green-400" : "text-yellow-300"}>
              {isSuccess
                ? "Paiement confirmé ✔."
                : "Statut inconnu ou paiement non confirmé"}
            </span>
          </p>

          {title && (
            <p>
              Escape game : <span className="font-semibold">{title}</span>
            </p>
          )}

          <p>
            Montant payé : <span className="font-semibold">{total} €</span>
          </p>

          <p className="text-xs text-[#CCCCCC]">
            Vous recevrez également un email de confirmation. Conservez bien ce
            numéro de réservation.
          </p>
        </div>

        {/* Actions : facture + retour + politique d'annulation */}
        <div className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] p-6 space-y-4 text-sm">
          <h2 className="text-lg font-semibold text-white">
            Suivi et facture
          </h2>
          <p className="text-xs text-[#CCCCCC]">
            Téléchargez votre facture au format PDF pour conserver une trace de
            votre achat.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="flex-1 rounded-md bg-[#4A90E2] py-2 text-sm font-semibold text-white hover:bg-[#357ABD] transition-colors"
            >
              Télécharger votre facture (PDF)
            </button>
            <button
              type="button"
              onClick={() => navigate("/catalogue")}
              className="flex-1 rounded-md bg-[#F5A623] py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors"
            >
              Retour au catalogue
            </button>
          </div>

          {/* Politique d'annulation pour cette réservation */}
          <div className="mt-4 border-t border-[#4A90E2]/40 pt-3 text-xs text-[#CCCCCC]">
            <h3 className="text-sm font-semibold text-[#F5A623] mb-1">
              Conditions d&apos;annulation pour cette réservation
            </h3>
            {policyLoading && (
              <p className="text-xs text-[#CCCCCC]">
                Calcul des conditions d&apos;annulation...
              </p>
            )}
            {policyError && (
              <p className="text-xs text-red-400">{policyError}</p>
            )}
            {!policyLoading && !policyError && cancellationInfo && (
              <p>
                {cancellationInfo.refundPercent > 0
                  ? `Si vous annulez maintenant, vous pourrez être remboursé à hauteur de ${cancellationInfo.refundPercent} %.`
                  : "Selon nos règles, cette réservation n'est plus remboursable."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



