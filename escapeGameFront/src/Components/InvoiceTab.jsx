import { useState } from "react";
import jsPDF from "jspdf";
import Logo from "../assets/Logo.png";

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export function InvoiceTab({ booking }) {
  const [generating, setGenerating] = useState(false);

  const handleDownloadInvoice = () => {
    if (!booking) {
      alert("Les informations de réservation ne sont pas disponibles.");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const marginLeft = 20;
    let y = 20;

    doc.addImage(Logo, "PNG", marginLeft, y, 30, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("FACTURE", 105, y + 10, { align: "center" });
    y += 30;

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

    const clientX = 120;
    let clientY = 50;
    doc.setFont("helvetica", "bold");
    doc.text("Facturé à :", clientX, clientY);
    doc.setFont("helvetica", "normal");
    clientY += 5;
    doc.text(`${booking.firstname} ${booking.lastname}`, clientX, clientY);
    clientY += 5;
    doc.text(`${booking.adress}`, clientX, clientY);
    clientY += 5;
    doc.text(`${booking.postal_code} ${booking.city}`, clientX, clientY);
    clientY += 5;
    doc.text(`${booking.email}`, clientX, clientY);

    y = Math.max(y, clientY) + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`N° de facture : FAC-${booking.id_booking}`, marginLeft, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    let invoiceDate = "Date inconnue";

    if (booking.date_payment) {
      const d = new Date(booking.date_payment);
      if (!isNaN(d.getTime())) {
        invoiceDate = d.toLocaleDateString("fr-FR");
      }
    }

    doc.text(`Date de facturation : ${invoiceDate}`, marginLeft, y);
    y += 6;
    doc.text(`Mode de paiement : ${booking.mode_payment || "Carte bancaire"}`, marginLeft, y);
    y += 6;
    doc.text(`Référence : Réservation ${booking.id_booking}`, marginLeft, y);
    y += 10;

    const priceTTC = Number(booking.total_payment || booking.price_escape);
    const priceHT = +(priceTTC / 1.2).toFixed(2);
    const tvaAmount = +(priceTTC - priceHT).toFixed(2);

    doc.setFont("helvetica", "bold");
    doc.text("Description", marginLeft, y);
    doc.text("Prix HT", 110, y);
    doc.text("% TVA", 140, y);
    doc.text("Prix TTC", 170, y, { align: "right" });
    y += 6;

    doc.setFont("helvetica", "normal");
    const description = `${booking.title} - ${booking.location}`;
    doc.text(description, marginLeft, y);
    doc.text(`${priceHT.toFixed(2)} €`, 110, y);
    doc.text("20 %", 140, y);
    doc.text(`${priceTTC.toFixed(2)} €`, 170, y, { align: "right" });
    y += 10;

    const totalX = 170;
    doc.setFont("helvetica", "normal");
    doc.text(`Sous-total HT : ${priceHT.toFixed(2)} €`, totalX, y, { align: "right" });
    y += 6;
    doc.text(`TVA (20 %) : ${tvaAmount.toFixed(2)} €`, totalX, y, { align: "right" });
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL TTC : ${priceTTC.toFixed(2)} €`, totalX, y, { align: "right" });
    y += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Merci pour votre réservation. Conservez cette facture comme justificatif.",
      marginLeft,
      y,
      { maxWidth: 170 }
    );

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

    doc.save(`facture-reservation-${booking.id_booking}.pdf`);
  };

  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
      <TableCell className="px-4 py-4 text-sm sm:text-base">
        <div className="truncate max-w-[120px] sm:max-w-none">{booking.title}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell px-4 py-4 text-sm">
        {booking.location}
      </TableCell>
      <TableCell className="hidden lg:table-cell px-4 py-4 text-sm font-medium">
        {booking.price_escape} €
      </TableCell>
      <TableCell className="text-right px-4 py-4">
        <button 
          onClick={handleDownloadInvoice}
          disabled={generating}
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-500 dark:bg-primary-900 dark:hover:bg-primary-800 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap sm:text-sm sm:px-4 sm:py-2"
        >
          {generating ? (
            <>
              <svg className="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Génération...
            </>
          ) : (
            "Télécharger la facture"
          )}
        </button>
      </TableCell>
    </TableRow>
  );
}
