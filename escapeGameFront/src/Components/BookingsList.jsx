import { Card } from "flowbite-react";
import { useEffect } from "react";
import PageProfilService from "../Services/PageProfilService";
import { useState } from "react";
import BookingCard from "./BookingCard";

export default function BookingsList() {
    const id = localStorage.getItem("user_id");
    const [bookings, setBookings] = useState([]);

useEffect(() => {
    const fetchBookings = async () => {
    try {
    const response = await PageProfilService.getAllBookingsById(id);
    console.log(response.data)
    setBookings(response.data)
    } catch (error) {
     console.error ("Erreur lors de la récupération des réservations", error)
    }

};
fetchBookings();
}, [id]);



  return ( <>

    <h1 className=" text-gray-700 dark:text-gray-300 text-center">Réservation</h1>
  <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-5">
    {bookings.map((booking) => {
        return <BookingCard booking={booking} key={booking.id_booking} />
})}
  </div>
  </>);
}