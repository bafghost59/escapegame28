import { useEffect, useState } from "react";
import PageProfilService from "../Services/PageProfilService";
import { InvoiceTab } from "./InvoiceTab";
import { Table, TableHead, TableHeadCell, TableBody } from "flowbite-react";

export default function InvoicesList() {
  const accountId = localStorage.getItem("user_id");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const token = localStorage.getItem("token");
        console.log("🔑 token =", token);                                                                               // Infos pour récupérer la liste des factures
        console.log("👤 accountId =", accountId);

        if (!token || !accountId) return;                                                                                // Si KO - Return 

        const res = await PageProfilService.getAllBookingsById(accountId);
        setBookings(res.data);                                                                                           // SI OK - Interrogation de la BDD - la réponse est stocké dans un tableau ensuite
      } catch (error) {
        console.error("Erreur chargement factures", error);
      } finally {
        setLoading(false);                                                                                                 // False - Pas de factures dans la BDD - info à l'user ensuite
      }
    }

    fetchInvoices();
  }, [accountId]);

  const paidBookings = bookings.filter((b) => b.status === "confirmé");                                                       // Const pour ne récupérer que les réservations confirmées - filtre appliqué

  useEffect(() => {
  }, [bookings]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 text-center mb-8 sm:text-3xl">
        Mes factures
      </h1>

      {loading && (
        <div className="flex justify-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">Chargement des factures...</p>                                     {/* Application d'un temps de chargement pour les factures */}
        </div>
      )}

      {!loading && paidBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">Aucune réservation payée pour le moment.</p>                        {/* si les 2 conditions sont vraies - Pas de factures */}
        </div>
      )}

      {!loading && paidBookings.length > 0 && (
        <div className="w-full">
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <Table striped>
              <TableHead className="bg-gray-50 dark:bg-gray-700">
                <TableHeadCell className="py-3 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider dark:text-white sm:text-sm">
                  Escape Game réservé
                </TableHeadCell>
                <TableHeadCell className="hidden md:table-cell py-3 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider dark:text-white sm:text-sm">
                  Ville
                </TableHeadCell>
                <TableHeadCell className="hidden lg:table-cell py-3 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider dark:text-white sm:text-sm">
                  Montant payé
                </TableHeadCell>
                <TableHeadCell className="text-right py-3 px-4 text-xs font-bold text-gray-900 uppercase tracking-wider dark:text-white sm:text-sm">
                  Facture PDF
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">                                                     {/* Si les 2 conditions sont vraies - pas de temps de chargement + réservations payées dans la BDD - .map sur les réservations payées - génération des factures  */}
                {paidBookings.map((booking) => (                                                                                        
                  <InvoiceTab booking={booking} key={booking.id_booking} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

