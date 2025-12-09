// src/Pages/PageReservationOne.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEscapeById } from "../Services/PageCatalogue";
import { createBooking } from "../Services/PageReservationOne";

function difficultyToLabel(difficult) {
  if (difficult === "easy") return "Facile";
  if (difficult === "medium") return "Intermédiaire";
  if (difficult === "hard") return "Difficile";
  return "N/A";
}

function durationToLabel(duration) {
  if (!duration) return "Durée inconnue";
  const d = new Date(duration);
  if (Number.isNaN(d.getTime())) return `Durée : ${duration}`;
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}min`);
  if (!parts.length) return "Durée inconnue";
  return `Durée : ${parts.join(" ")}`;
}

export default function PageReservationOne() {
  const { id } = useParams(); // id_escape
  const navigate = useNavigate();

  const [escape, setEscape] = useState(null);
  const [loadingEscape, setLoadingEscape] = useState(true);
  const [errorEscape, setErrorEscape] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [players, setPlayers] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // 1) Charger l’escape choisi
  useEffect(() => {
    async function fetchEscape() {
      try {
        const data = await getEscapeById(id);
        setEscape(data);

        // Valeur par défaut pour le nombre de joueurs
        if (data?.min_players) {
          setPlayers(data.min_players);
        }
      } catch (err) {
        console.error(err);
        setErrorEscape("Impossible de charger cet escape game.");
      } finally {
        setLoadingEscape(false);
      }
    }
    fetchEscape();
  }, [id]);

  // 2) Charger les créneaux disponibles pour une date donnée
  useEffect(() => {
    if (!selectedDate || !escape) return;

    async function fetchSlots() {
      setLoadingSlots(true);
      setErrorSlots(null);
      setSlots([]);
      setSelectedSlot("");

      try {
        // TODO: à remplacer par appel API réel
        // const apiSlots = await getSlotsForEscapeAndDate(escape.id_escape, selectedDate);
        // setSlots(apiSlots);

        // MOCK provisoire en attendant l’API
        const mockSlots = [
          "10:00",
          "14:00",
          "16:30",
          "19:00",
        ];
        setSlots(mockSlots);
      } catch (err) {
        console.error(err);
        setErrorSlots("Impossible de charger les créneaux disponibles.");
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate, escape]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    if (!selectedDate || !selectedSlot) {
      setSubmitError("Merci de choisir une date et un créneau.");
      return;
    }

    if (!escape) {
      setSubmitError("Escape game introuvable.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setSubmitError("Vous devez être connecté pour réserver.");
      return;
    }

    setSubmitting(true);

    (async () => {
      try {
        // on construit les DATETIME pour MySQL
        const date_booking = `${selectedDate} 00:00:00`;
        const hours_selected = `${selectedDate} ${selectedSlot}:00`;

        const { id_booking } = await createBooking({
          date_booking,
          hours_selected,
          escape_id: escape.id_escape,
          user_id: Number(userId),
        });

        navigate(`/reservation/${escape.id_escape}/paiement`, {
          state: {
            bookingId: id_booking,
            escapeId: escape.id_escape,
            date: selectedDate,
            time: selectedSlot,
            players,
          },
        });
      } catch (err) {
        console.error(err);
        setSubmitError(err.message || "Erreur pendant la réservation.");
      } finally {
        setSubmitting(false);
      }
    })();
  }


  if (loadingEscape) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (errorEscape || !escape) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-red-500">{errorEscape || "Escape introuvable."}</p>
      </div>
    );
  }

  const fieldClasses =
    "w-full rounded-md bg-[#2C2C3A] border border-[#F5A623] px-3 py-2 text-sm text-white placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#F5A623]";

  return (
    <div className="min-h-screen w-full bg-[#1E1E2F] text-[#EAEAEA] px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Stepper */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5A623] text-white text-xs font-bold">
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
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CCCCCC] text-xs">
              3
            </span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Étape 1 – Choix du créneau
          </h1>
          <p className="text-sm text-[#EAEAEA]">
            Sélectionnez la date, l&apos;horaire et le nombre de joueurs pour votre escape game.
          </p>
        </div>

        {/* Récap escape */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] overflow-hidden">
            <img
              src={escape.photo_escape}
              alt={escape.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-white">
                {escape.title}
              </h2>
              <p className="text-xs text-[#CCCCCC]">{escape.location}</p>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                <span className="rounded-full border border-[#F5A623] px-2 py-0.5 text-[#F5A623]">
                  {difficultyToLabel(escape.difficult)}
                </span>
                <span>{durationToLabel(escape.duration)}</span>
                {escape.min_players && escape.max_players && (
                  <span>
                    {escape.min_players} – {escape.max_players} joueurs
                  </span>
                )}
                <span>
                  Prix :{" "}
                  <span className="font-semibold text-white">
                    {escape.price_escape} €
                  </span>
                </span>
              </div>
              <p className="text-xs mt-3 line-clamp-4">
                {escape.describe}
              </p>
            </div>
          </div>

          {/* Formulaire réservation */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#2C2C3A] rounded-lg border border-[#4A90E2] p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              Sélectionnez votre créneau
            </h2>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-xs text-[#CCCCCC]">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={fieldClasses}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {/* Créneaux */}
            <div className="space-y-1">
              <label className="text-xs text-[#CCCCCC]">
                Créneau horaire
              </label>
              {loadingSlots ? (
                <p className="text-xs text-[#CCCCCC]">Chargement des créneaux...</p>
              ) : errorSlots ? (
                <p className="text-xs text-red-500">{errorSlots}</p>
              ) : (
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className={fieldClasses}
                  disabled={!selectedDate || slots.length === 0}
                  required
                >
                  <option value="">
                    {selectedDate
                      ? slots.length
                        ? "Choisissez un créneau"
                        : "Aucun créneau disponible"
                      : "Choisissez d’abord une date"}
                  </option>
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Nombre de joueurs */}
            <div className="space-y-1">
              <label className="text-xs text-[#CCCCCC]">
                Nombre de joueurs
              </label>
              <input
                type="number"
                min={escape.min_players || 1}
                max={escape.max_players || 12}
                value={players}
                onChange={(e) => setPlayers(Number(e.target.value))}
                className={fieldClasses}
                required
              />
              {escape.min_players && escape.max_players && (
                <p className="text-[10px] text-[#CCCCCC]">
                  Min {escape.min_players} – Max {escape.max_players} joueurs
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-xs text-red-500 mt-2">{submitError}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-md bg-[#4A90E2] py-2 text-sm font-semibold text-white hover:bg-[#357ABD] transition-colors"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-md bg-[#F5A623] py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Validation..." : "Continuer vers le paiement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

