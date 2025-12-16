import { useState } from 'react';
import { Card, Button, Modal, ModalHeader, ModalBody, Label } from "flowbite-react";
import PageProfilService from "../Services/PageProfilService";
import { createStripeCheckoutSession } from '../Services/PaymentService.js';

export default function BookingCard({ booking, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    date_booking: booking.date_booking
      ? new Date(booking.date_booking).toISOString().slice(0, 19).replace('T', ' ')
      : '',                                                                                             // Modal pour modifier Résa
    hours_selected: booking.hours_selected?.slice(0, 5) || '14:00',
    status: booking.status,
    user_id: booking.user_id,
    escape_id: booking.escape_id
  });

const dateOnly = booking.date_booking
  ? new Date(booking.date_booking).toISOString().slice(0, 10) // "2025-01-10"
  : null;

const timeOnly = booking.hours_selected?.slice(0, 5) || null; // "14:00"

const combined = dateOnly && timeOnly
  ? new Date(`${dateOnly}T${timeOnly}`)
  : booking.date_booking
    ? new Date(booking.date_booking)
    : null;

const dateFr = combined                                                                                             // Paramètre pour combiner les 2 infos : date et heure sous format FR depuis la Card
  ? combined.toLocaleDateString("fr-FR")
  : "";

const heureFr = combined
  ? combined.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  : "";

const displayBookingDate = new Date(
  booking.date_payment || booking.date_booking
).toLocaleDateString("fr-FR");

  const handleUpdate = async () => {
    try {
      await PageProfilService.updateBooking(booking.id_booking, formData);
      setShowModal(false);
      alert('Réservation mise à jour !');                                                           // fonction pour permettre la mise à jour de la résa
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
     if (window.confirm("Voulez-vous vraiment supprimer votre réservation ?")) {
      try {
      await onDelete(booking.id_booking);  // props OnDelete initié dans BookingList
        alert("Réservation supprimée avec succès");                                                           // Fonction pour suppression de la résa avec alerte
        return
      } catch (error) {
        alert("La suppression a échoué, veuillez réessayer.", error);
      }
    }
  };

const handleResumePayment = async () => {
  setIsLoading(true);
  try { 
    const session = await createStripeCheckoutSession({
      bookingId: booking.id_booking, 
      total: booking.price_escape,   
      escapeTitle: booking.title,    
      promoCode: ""                                                                                             // Fonction pour reprendre le paiement avec redirection vers Stripe et les informations associées
    });
    window.location.href = session.url;                                                                             // paramètre pour rediriger vers Stripe
  } catch (error) { 
    alert("Erreur paiement, réessayez.");
    console.error(error);
    setIsLoading(false);
  }
};

  return (
    <>
      <Card
        className="max-w-md w-full bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
        imgSrc={booking.photo_escape}
        horizontal
      >
        <h5 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
          {booking.title}
        </h5>

        <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">                                                     {/* Props Booking utilisé pour récupérer les infos - initié depuis BookingList */}
          <p>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Date de réservation
            </span>
            <br />
            <span className="font-semibold">
              {displayBookingDate}
            </span>
          </p>

          <p>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Prix de la prestation
            </span>
            <br />
            <span className="font-semibold">
              {booking.price_escape}
            </span>
          </p>

          <p>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Date sélectionnée
            </span>
            <br />
            <span className="flex font-semibold">
              Date : {dateFr} <br />
              Heure : {heureFr}
            </span>
          </p>

          <p>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Statut de la réservation
            </span>
            <br />
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold
                ${
                  booking.status === "confirmé"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "annulé"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {booking.status}
            </span>
          </p>

          <p>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Lieu
            </span>
            <br />
            <span className="font-semibold">
              {booking.location}
            </span>
          </p>
        </div>

 <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
  {/* Boutons conditionnels selon statut */}
  {booking.status === "en attente" ? (
    <>
      <Button size="sm" color="success" onClick={handleResumePayment} disabled={isLoading} className="flex-1">
        💳 Reprendre paiement
      </Button>
      <Button size="sm" color="failure" onClick={handleDelete} className="flex-1">
        Supprimer
      </Button>
    </>
  ) : (
    <>
      <Button size="sm" color="blue" onClick={() => setShowModal(true)} className="flex-1">
        Modifier
      </Button>
      <Button size="sm" color="failure" onClick={handleDelete} className="flex-1">
        Supprimer
      </Button>
    </>
  )}
</div>

      </Card>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="md"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <ModalHeader className="bg-slate-500 dark:bg-gray-900 text-gray-900 dark:text-white">
            Modifier la réservation
          </ModalHeader>
          <ModalBody className="bg-slate-500 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <form className="space-y-4">
              <div>
                <Label htmlFor="date_booking" className="text-gray-700 dark:text-gray-300">
                  Date réservation
                </Label>
                <input
                  id="date_booking"
                  type="date"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={formData.date_booking ? formData.date_booking.slice(0, 10) : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date_booking: `${e.target.value} ${formData.hours_selected || '00:00'}:00`,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="hours_selected" className="text-gray-700 dark:text-gray-300">
                  Heure
                </Label>
                <input
                  id="hours_selected"
                  type="time"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={formData.hours_selected}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hours_selected: e.target.value,
                      date_booking: formData.date_booking
                        ? `${formData.date_booking.slice(0, 10)} ${e.target.value}:00`
                        : formData.date_booking,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">
                  Statut
                </Label>
                <select
                  id="status"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="confirmé">Confirmé</option>
                  <option value="annulé">Annulé</option>
                  <option value="en attente">En attente</option>
                </select>
              </div>
            </form>

            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button color="blue" onClick={handleUpdate} className="flex-1">
                Enregistrer
              </Button>
              <Button
                color="gray"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
}
