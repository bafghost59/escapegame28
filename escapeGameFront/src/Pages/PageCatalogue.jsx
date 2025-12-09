// src/Pages/PageCatalogue.jsx
import React, { useEffect, useState, useMemo } from "react";
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

// durée en minutes pour filtrer
function durationToMinutes(duration) {
  if (!duration) return null;
  const d = new Date(duration);
  if (Number.isNaN(d.getTime())) return null;
  return d.getHours() * 60 + d.getMinutes();
}

export default function PageCatalogue() {
  const [escapes, setEscapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtres
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxDuration, setMaxDuration] = useState(""); // minutes

  useEffect(() => {
    async function fetchEscapes() {
      try {
        const data = await getAllEscapes();

        const enriched = data.map((escape) => {
          const tagsArray =
            typeof escape.tags === "string"
              ? escape.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
              : [];
          return {
            ...escape,
            tagsArray,
            durationMinutes: durationToMinutes(escape.duration),
          };
        });

        setEscapes(enriched);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le catalogue.");
      } finally {
        setLoading(false);
      }
    }

    fetchEscapes();
  }, []);

  const allTags = useMemo(
    () =>
      Array.from(new Set(escapes.flatMap((e) => e.tagsArray || []))),
    [escapes]
  );

  const allLocations = useMemo(
    () =>
      Array.from(
        new Set(escapes.map((e) => e.location).filter(Boolean))
      ),
    [escapes]
  );

  const filteredEscapes = useMemo(
    () =>
      escapes.filter((escape) => {
        if (difficultyFilter !== "all" && escape.difficult !== difficultyFilter)
          return false;

        if (
          tagFilter !== "all" &&
          !(escape.tagsArray || []).includes(tagFilter)
        )
          return false;

        if (locationFilter !== "all" && escape.location !== locationFilter)
          return false;

        if (maxPrice && Number(escape.price_escape) > Number(maxPrice))
          return false;

        if (
          maxDuration &&
          escape.durationMinutes != null &&
          escape.durationMinutes > Number(maxDuration)
        )
          return false;

        return true;
      }),
    [escapes, difficultyFilter, tagFilter, locationFilter, maxPrice, maxDuration]
  );

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

  const fieldClasses =
    "rounded-md bg-[#2C2C3A] border border-[#F5A623] px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]";

  return (
    <div className="min-h-screen bg-[#1E1E2F] px-8 py-10 text-[#EAEAEA]">
      <h1 className="mb-8 text-center">Catalogue</h1>

      {/* Barre de filtres */}
      <div className="mb-8 grid gap-4 md:grid-cols-5 bg-[#2C2C3A] p-4 rounded-lg border border-[#4A90E2]">
        {/* Difficulté */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#CCCCCC]">Difficulté</label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className={fieldClasses}
          >
            <option value="all">Toutes</option>
            <option value="easy">Facile</option>
            <option value="medium">Intermédiaire</option>
            <option value="hard">Difficile</option>
          </select>
        </div>

        {/* Tag */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#CCCCCC]">Thème / Tag</label>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className={fieldClasses}
          >
            <option value="all">Tous</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Localisation */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#CCCCCC]">Localisation</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className={fieldClasses}
          >
            <option value="all">Toutes</option>
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Prix max */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#CCCCCC]">Prix max (€)</label>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={fieldClasses}
            placeholder="ex : 30"
          />
        </div>

        {/* Durée max */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#CCCCCC]">
            Durée max (minutes)
          </label>
          <input
            type="number"
            min="0"
            value={maxDuration}
            onChange={(e) => setMaxDuration(e.target.value)}
            className={fieldClasses}
            placeholder="ex : 60"
          />
        </div>
      </div>

      {/* Grille des cartes */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
        {filteredEscapes.map((escape) => (
          <div key={escape.id_escape} className="h-full">
            <Card
              title={escape.title}
              subtitle={escape.location}
              description={escape.describe}
              price={`${escape.price_escape} €`}
              rating={difficultyToRating(escape.difficult)}
              difficultyLabel={difficultyToLabel(escape.difficult)}
              durationLabel={durationToLabel(escape.duration)}
              imageUrl={escape.photo_escape}
              detailUrl={`/catalogue/${escape.id_escape}`}
              tags={escape.tagsArray}
              reservationUrl={`/reservation/${escape.id_escape}`}   // NEW
            />
          </div>
        ))}
      </div>
    </div>
  );
}









