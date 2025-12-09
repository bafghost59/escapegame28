import { useEffect, useState } from "react";
import PageProfilService from "../Services/PageProfilService";
import BookingCard from "./BookingCard";

export default function BookingsList() {
  const id = localStorage.getItem("user_id");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await PageProfilService.getAllBookingsById(id);
        setBookings(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations", error);
      }
    };
    fetchBookings();
  }, [id]);

  const handleDeleteBooking = async (id_booking) => {
    try {
      await PageProfilService.deleteBooking(id_booking);
      setBookings((prev) => prev.filter((b) => b.id_booking !== id_booking));
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation", error);
    }
  };

  return (
    <>
      <h1 className="text-gray-700 dark:text-gray-300 text-center">
        Mes Réservations
      </h1>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-5">
        {bookings.map((booking) => (
          <BookingCard
            booking={booking}
            key={booking.id_booking}
            onDelete={handleDeleteBooking}
          />
        ))}
      </div>
    </>
  );
}
