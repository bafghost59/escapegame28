import { useEffect, useState } from "react";
import PageAdmin from "../Services/PageAdmin";

function Dashboard() {
    const [reservations, setReservations] = useState([]);

    // Appel de l'API pour récupérer les réservations
    useEffect(() => {
        async function fetchReservations() {
            try {
                const data = await PageAdmin.fetchPageAdmin();
                setReservations(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchReservations();
    }, []);


    return (
        <div className="w-full p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Tableau de bord Admin</h1>

            <div className="bg-white text-black rounded-xl shadow p-4 overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="px-4 py-3 text-center whitespace-nowrap">ID</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Nom</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Prénom</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Email</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Titre de l'escape Game</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Montant</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Date réservée</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Créneau</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Statut</th>
                            <th className="px-4 py-3 text-center whitespace-nowrap">Paiement</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id_booking} className="border-b">
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.userId}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.lastname}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.firstname}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.email}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.escape_title}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.total_payment} €</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">
                                    {new Date(reservation.date_booking).toLocaleString()} // transformer la date au format lisible comme par exemple 25/12/2025
                                </td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">
                                    {new Date(reservation.hours_selected).toLocaleTimeString()} // transformer l'heure au format lisible comme par exemple 14:30
                                </td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.booking_status}</td>
                                <td className="px-4 py-3 text-center whitespace-nowrap">{reservation.mode_payment}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Dashboard;