// src/Pages/PageEscapeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEscapeById } from "../Services/PageCatalogue";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

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

export default function PageEscapeDetail() {
  const { id } = useParams();
  const [escape, setEscape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [policyError, setPolicyError] = useState(null);

  useEffect(() => {
    async function fetchEscape() {
      try {
        const data = await getEscapeById(id);
        setEscape(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger cet escape game.");
      } finally {
        setLoading(false);
      }
    }
    fetchEscape();
  }, [id]);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await axios.get(`${API_BASE_URL}/cancellation-policies`);
        setCancellationPolicies(res.data || []);
      } catch (err) {
        console.error(err);
        setPolicyError(
          "Impossible de charger la politique d'annulation pour le moment."
        );
      }
    }
    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  if (error || !escape) {
    return (
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <p className="text-red-500">{error || "Escape introuvable."}</p>
      </div>
    );
  }

  const tags =
    typeof escape.tags === "string"
      ? escape.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : Array.isArray(escape.tags)
      ? escape.tags
      : [];

  const globalPolicies = (cancellationPolicies || []).filter(
    (p) => p.escape_id === null || typeof p.escape_id === "undefined"
  );

  return (
    <div className="w-full bg-[#1E1E2F] text-[#EAEAEA] px-8 py-10">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={escape.photo_escape}
            alt={escape.title}
            className="w-full h-80 object-cover rounded-lg border border-[#4A90E2]"
          />
          {escape.video && (
            <video
              controls
              src={escape.video}
              className="mt-4 w-full rounded-lg"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {escape.title}
          </h1>
          <p className="text-sm mb-4">{escape.location}</p>

          <div className="flex flex-col items-start gap-2 text-sm mb-4">
            <span className="rounded-full border border-[#F5A623] px-3 py-1 text-[#F5A623]">
              {difficultyToLabel(escape.difficult)}
            </span>
            <span>{durationToLabel(escape.duration)}</span>
            {escape.min_players && escape.max_players && (
              <span>
                {escape.min_players}–{escape.max_players} joueurs
              </span>
            )}
            <span>
              Prix :{" "}
              <span className="font-semibold text-white">
                {escape.price_escape} €
              </span>
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-6">{escape.describe}</p>

          {tags.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#F5A623] mb-2">
                Thèmes / Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#2C2C3A] rounded-full border border-[#4A90E2]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Politique d'annulation */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-[#F5A623] mb-2">
              Politique d&apos;annulation
            </h2>
            {policyError && (
              <p className="text-xs text-red-400">{policyError}</p>
            )}
            {!policyError && globalPolicies.length > 0 && (
              <ul className="text-xs text-[#CCCCCC] list-disc pl-4 space-y-1">
                {globalPolicies.map((p, index) => {
                  const isInfinite = p.hours_before_max >= 9999;
                  return (
                    <li key={index}>
                      {isInfinite
                        ? `Annulation plus de ${p.hours_before_min}h avant : ${p.refund_percent}% remboursé.`
                        : `Annulation entre ${p.hours_before_min}h et ${p.hours_before_max}h avant : ${p.refund_percent}% remboursé.`}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <Link
            to={`/reservation/${escape.id_escape}`}
            className="inline-block mt-6 rounded-md bg-[#F5A623] px-6 py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors"
          >
            Réserver ce jeu
          </Link>
        </div>
      </div>
    </div>
  );
}


