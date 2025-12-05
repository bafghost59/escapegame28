import { useEffect, useState } from "react";
import PageAdmin from "../Services/PageAdmin";

function Dashboard() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const response = await PageAdmin.fetchPageAdmin();
                setReservations(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchReservations();
    }, []);

    return (
        <div className="w-full p-4 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Tableau de bord Admin</h1>

            <div className="overflow-x-auto bg-white text-black rounded-xl shadow p-2 sm:p-4">
                <table className="min-w-full text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 text-center">ID</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 text-center">Nom</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 text-center">Prénom</th>
                            <th className="hidden md:table-cell px-4 py-2 text-center">Email</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 text-center">Titre</th>
                            <th className="hidden md:table-cell px-4 py-2 text-center">Montant</th>
                            <th className="hidden md:table-cell px-4 py-2 text-center">Date</th>
                            <th className="hidden lg:table-cell px-4 py-2 text-center">Créneau</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 text-center">Statut</th>
                            <th className="hidden md:table-cell px-4 py-2 text-center">Paiement</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id_booking} className="border-b hover:bg-gray-50">
                                <td className="px-2 py-1 sm:px-4 sm:py-2 text-center">{reservation.userId}</td>
                                <td className="px-2 py-1 sm:px-4 sm:py-2 text-center">{reservation.lastname}</td>
                                <td className="px-2 py-1 sm:px-4 sm:py-2 text-center">{reservation.firstname}</td>
                                <td className="hidden md:table-cell px-4 py-2 text-center">{reservation.email}</td>
                                <td className="px-2 py-1 sm:px-4 sm:py-2 text-center">{reservation.escape_title}</td>
                                <td className="hidden md:table-cell px-4 py-2 text-center">{reservation.total_payment} €</td>
                                <td className="hidden md:table-cell px-4 py-2 text-center">{new Date(reservation.date_booking).toLocaleDateString("fr-FR")}</td>
                                <td className="hidden lg:table-cell px-4 py-2 text-center">{new Date(reservation.hours_selected).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}</td>
                                <td className="px-2 py-1 sm:px-4 sm:py-2 text-center">{reservation.booking_status}</td>
                                <td className="hidden md:table-cell px-4 py-2 text-center">{reservation.mode_payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
