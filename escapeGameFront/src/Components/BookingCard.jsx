import { Card } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function BookingCard ({booking}) {



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
        Date sélectionnée
      </span>
      <br />
      <span className="font-semibold">
        {booking.hours_selected}
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
</Card>

  );
}