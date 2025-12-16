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
import Logo from "../assets/Logo.png";

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
  const [bookingDetails, setBookingDetails] = useState(null);

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





  if (!bookingDetails) {
    alert("Les informations de réservation ne sont pas disponibles.");
    return;
  }

  // 1. Création du doc + bases
  const doc = new jsPDF("p", "mm", "a4");
  const marginLeft = 20;
  let y = 20;

  // 2. Logo + titre FACTURE
  doc.addImage(Logo, "PNG", marginLeft, y, 30, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("FACTURE", 105, y + 10, { align: "center" });
  y += 30;

  // 3. Adresse vendeur (nous) à gauche
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Escape Game 28", marginLeft, y);
  doc.setFont("helvetica", "normal");
  y += 5;
  doc.text("12 rue de la Liberté", marginLeft, y);
  y += 5;
  doc.text("28000 Chartres", marginLeft, y);
  y += 5;
  doc.text("contact@escapegame28.fr", marginLeft, y);
  y += 10;

  // 4. Adresse client à droite (depuis bookingDetails)
  const clientX = 120;
  let clientY = 50;
  doc.setFont("helvetica", "bold");
  doc.text("Facturé à :", clientX, clientY);
  doc.setFont("helvetica", "normal");
  clientY += 5;
  doc.text(`${bookingDetails.firstname} ${bookingDetails.lastname}`, clientX, clientY);
  clientY += 5;
  doc.text(`${bookingDetails.adress}`, clientX, clientY);
  clientY += 5;
  doc.text(`${bookingDetails.postal_code} ${bookingDetails.city}`, clientX, clientY);
  clientY += 5;
  doc.text(`${bookingDetails.email}`, clientX, clientY);

  // 5. Infos facture (numéro, date, mode de paiement, référence)
  y = Math.max(y, clientY) + 10;
  doc.setFont("helvetica", "bold");
  doc.text(`N° de facture : FAC-${bookingDetails.id_booking}`, marginLeft, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  let invoiceDate = "Date inconnue";

if (bookingDetails.date_booking) {
  const d = new Date(bookingDetails.date_booking);
  if (!isNaN(d.getTime())) {
    invoiceDate = d.toLocaleDateString("fr-FR");
  }
}

doc.text(`Date de facturation : ${invoiceDate}`, marginLeft, y);
  doc.text(`Date de facturation : ${invoiceDate}`, marginLeft, y);
  y += 6;
  doc.text(`Mode de paiement : ${bookingDetails.mode_payment || "Carte bancaire"}`, marginLeft, y);
  y += 6;
  doc.text(`Référence : Réservation ${bookingDetails.id_booking}`, marginLeft, y);
  y += 10;

  // 6. Ligne de détail : Description / HT / TVA / TTC
  const priceTTC = Number(bookingDetails.total_payment);
  const priceHT = +(priceTTC / 1.2).toFixed(2);
  const tvaAmount = +(priceTTC - priceHT).toFixed(2);

  doc.setFont("helvetica", "bold");
  doc.text("Description", marginLeft, y);
  doc.text("Prix HT", 110, y);
  doc.text("% TVA", 140, y);
  doc.text("Prix TTC", 170, y, { align: "right" });
  y += 6;

  doc.setFont("helvetica", "normal");
  const description = `${bookingDetails.escape_title} - ${bookingDetails.escape_location}`;
  doc.text(description, marginLeft, y);
  doc.text(`${priceHT.toFixed(2)} €`, 110, y);
  doc.text("20 %", 140, y);
  doc.text(`${priceTTC.toFixed(2)} €`, 170, y, { align: "right" });
  y += 10;

  // 7. Totaux (récap à droite)
  const totalX = 170;
  doc.setFont("helvetica", "normal");
  doc.text(`Sous-total HT : ${priceHT.toFixed(2)} €`, totalX, y, { align: "right" });
  y += 6;
  doc.text(`TVA (20 %) : ${tvaAmount.toFixed(2)} €`, totalX, y, { align: "right" });
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL TTC : ${priceTTC.toFixed(2)} €`, totalX, y, { align: "right" });
  y += 15;

  // 8. Petit message
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "Merci pour votre réservation. Conservez cette facture comme justificatif.",
    marginLeft,
    y,
    { maxWidth: 170 }
  );

  // 9. Footer (mentions + bancaires) en bas de page
  const footerY = 280;
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(
    "Politique d'annulation disponible sur notre site.",
    marginLeft,
    footerY - 8
  );
  doc.text(
    "Coordonnées bancaires (fictives) : IBAN FR76 1234 5678 9012 3456 7890 123, BIC ABCDFRPPXXX",
    marginLeft,
    footerY
  );

  // 10. Sauvegarde
  doc.save(`facture-reservation-${bookingDetails.id_booking}.pdf`);
};

  
const confirmPaymentStatus = async () => {
  try {
    if (id && paymentStatus === "success") {
      await PageProfilService.confirmPayment(id, total);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du paiement", error);                                                         // const pour permettre d'enregistrer le paiement dans la BDD
  }
};

useEffect(() => {

  confirmPaymentStatus();
}, [id, paymentStatus]);

useEffect(() => {
  async function fetchBookingDetails() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;                                                               // infos pour être visible sur le PDF de la facture

      const res = await axios.get(`${API_BASE_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

 
      setBookingDetails(res.data);
    } catch (error) {
      console.error("Erreur chargement bookingDetails", error);
    }
  }

  if (id) {
    fetchBookingDetails();
  }
}, [id]);

useEffect(() => {

}, [bookingDetails]);



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



