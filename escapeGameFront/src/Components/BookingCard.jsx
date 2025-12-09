import { Card, Button } from "flowbite-react";

export default function BookingCard({ booking }) {
  const isoString = "2025-01-10T13:00:00.000Z";
  const dateObj = new Date(isoString);
  const dateFr = dateObj.toLocaleDateString("fr-FR"); 
  const heureFr = dateObj.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // À remplir avec vos fonctions
  const handleUpdate = () => {
    // Logique pour modifier la réservation
    console.log("Modifier", booking.id);
  };

  const handleDelete = () => {
    // Logique pour supprimer la réservation
    console.log("Supprimer", booking.id);
  };

  return (
    <Card
      className="max-w-md w-full bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
      imgSrc={booking.photo_escape}
      horizontal
    >
      <h5 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
        {booking.title}
      </h5>

      <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium text-gray-500 dark:text-gray-400">
            Date de réservation
          </span>
          <br />
          <span className="font-semibold">
            {new Date(booking.date_booking).toLocaleDateString("fr-FR")}
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
            Date : {dateFr} <br/>
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

      {/* Section boutons modifier/supprimer */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          size="sm"
          color="blue"
          onClick={handleUpdate}
          className="flex-1"
        >
          Modifier
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={handleDelete}
          className="flex-1"
          
        >
          Supprimer
        </Button>
      </div>
    </Card>
  );
}
