// src/Pages/PageCatalogue.jsx
import React, { useEffect, useState } from "react";
import Card from "../Components/Cards";
import { getAllEscapes } from "../Services/PageCatalogue";

function difficultyToRating(difficult) {
  if (difficult === "easy") return 3;
  if (difficult === "medium") return 4;
  if (difficult === "hard") return 5;
  return 4;
}

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

export default function PageCatalogue() {
  const [escapes, setEscapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEscapes() {
      try {
        const data = await getAllEscapes();
        setEscapes(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le catalogue.");
      } finally {
        setLoading(false);
      }
    }

    fetchEscapes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-white">Chargement du catalogue...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E2F] px-8 py-10 text-[#EAEAEA]">
      <h1 className="mb-8 text-3xl font-bold text-white">Catalogue</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
        {escapes.map((escape) => (
          <div key={escape.id_escape} className="h-full">
            <Card
              title={escape.title}
              subtitle={escape.location}
              description={escape.describe}
              price={`${escape.price_escape}€`}
              rating={difficultyToRating(escape.difficult)}
              difficultyLabel={difficultyToLabel(escape.difficult)}
              durationLabel={durationToLabel(escape.duration)}
              imageUrl={escape.photo_escape}
              detailUrl={`/catalogue/${escape.id_escape}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}







