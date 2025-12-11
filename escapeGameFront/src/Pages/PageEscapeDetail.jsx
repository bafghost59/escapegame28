// src/Pages/PageEscapeDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getEscapeById } from "../Services/PageCatalogue";
import {
  getFeedbacksByEscapeId,
  getFeedbackStatsByEscapeId,
  createFeedback,
} from "../Services/PageAvis";
import Example from "../Components/Example";
import videoPyramide from "../assets/pyramide.mp4";
import videoBraquage from "../assets/braquage.mp4";
import videoManoir from "../assets/manoir.mp4";
import videoPrison from "../assets/prison.mp4";
import videoZombie from "../assets/zombie.mp4";

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

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackStats, setFeedbackStats] = useState({
    avg_rating: null,
    total_reviews: 0,
  });
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const videoMap = {
    pyramide: videoPyramide,
    braquage: videoBraquage,
    manoir: videoManoir,
    prison: videoPrison,
    zombie: videoZombie,
  };

  // ------------------ Fetch escape ------------------
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

  // ------------------ Fetch cancellation policies ------------------
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

  // ------------------ Fetch feedbacks ------------------
  useEffect(() => {
    async function fetchFeedback() {
      try {
        const [list, stats] = await Promise.all([
          getFeedbacksByEscapeId(id),
          getFeedbackStatsByEscapeId(id),
        ]);
        setFeedbacks(list);
        setFeedbackStats(stats || { avg_rating: null, total_reviews: 0 });
      } catch (err) {
        console.error(err);
        setFeedbackError("Impossible de charger les avis pour le moment.");
      }
    }
    fetchFeedback();
  }, [id]);

  // ------------------ Submit feedback ------------------
  async function handleSubmitFeedback(e) {
    e.preventDefault();
    setFeedbackError(null);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
      setFeedbackError("Vous devez être connecté pour laisser un avis.");
      return;
    }

    const userHasAlreadyCommented =
      feedbacks.some((f) => f.user_id === user.id);

    if (!newRating && !userHasAlreadyCommented) {
      setFeedbackError("Merci de choisir une note.");
      return;
    }

    setFeedbackLoading(true);
    try {
      await createFeedback({
        rated: newRating,
        rating: newComment,
        escape_id: escape.id_escape,
        user_id: user.id,
        token,
      });

      setNewRating(0);
      setNewComment("");

      const [list, stats] = await Promise.all([
        getFeedbacksByEscapeId(id),
        getFeedbackStatsByEscapeId(id),
      ]);
      setFeedbacks(list);
      setFeedbackStats(stats || { avg_rating: null, total_reviews: 0 });
    } catch (err) {
      console.error(err);
      setFeedbackError(err.message || "Erreur lors de l'envoi de l'avis.");
    } finally {
      setFeedbackLoading(false);
    }
  }

  // ------------------ Loading & Error ------------------
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

  // ------------------ Video ------------------
  const videoKey = escape.video?.toLowerCase().replace(".mp4", "");
  const videoSrc = videoKey ? videoMap[videoKey] : null;

  // ------------------ Ratings ------------------
  const avgRatingNumber =
    feedbackStats && feedbackStats.avg_rating != null
      ? Number(feedbackStats.avg_rating)
      : null;

  // ------------------ Tags ------------------
  const tags =
    typeof escape.tags === "string"
      ? escape.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : Array.isArray(escape.tags)
        ? escape.tags
        : [];

  // ------------------ Global policies ------------------
  const globalPolicies = (cancellationPolicies || []).filter(
    (p) => p.escape_id === null || typeof p.escape_id === "undefined"
  );

  // ------------------ JSX ------------------
  return (
    <div className="w-full bg-[#1E1E2F] text-[#EAEAEA] px-8 py-10">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Photo + Vidéo */}
        <div>
          <img
            src={escape.photo_escape}
            alt={escape.title}
            className="w-full h-80 object-cover rounded-lg border border-[#4A90E2]"
          />
          {videoSrc && (
            <div className="mt-4">
              <Example src={videoSrc} />
            </div>
          )}
        </div>

        {/* Infos */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{escape.title}</h1>
          <p className="text-sm mb-2">{escape.location}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {avgRatingNumber && !Number.isNaN(avgRatingNumber) ? (
              <>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const v = i + 1;
                    return (
                      <span
                        key={v}
                        className={
                          v <= Math.round(avgRatingNumber)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
                <span className="text-sm text-[#CCCCCC]">
                  {avgRatingNumber.toFixed(1)} / 5 ({feedbackStats.total_reviews} avis)
                </span>
              </>
            ) : (
              <span className="text-sm text-[#CCCCCC]">Aucun avis pour le moment</span>
            )}
          </div>

          {/* Infos supplémentaires */}
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
              Prix : <span className="font-semibold text-white">{escape.price_escape} €</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-6">{escape.describe}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-[#F5A623] mb-2">Thèmes / Tags</h2>
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
            <h2 className="text-lg font-semibold text-[#F5A623] mb-2">Politique d&apos;annulation</h2>
            {policyError && <p className="text-xs text-red-400">{policyError}</p>}
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

      {/* Feedbacks */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#F5A623] mb-4">Avis des joueurs</h2>

        {feedbackError && <p className="text-sm text-red-400 mb-2">{feedbackError}</p>}

        {feedbacks.length === 0 && !feedbackError && (
          <p className="text-sm text-[#CCCCCC] mb-4">Aucun avis pour le moment.</p>
        )}

        {feedbacks.length > 0 && (
          <ul className="space-y-3 mb-6">
            {feedbacks.map((f) => (
              <li
                key={f.id_feedback}
                className="bg-[#2C2C3A] border border-[#4A90E2] rounded-md p-3 text-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-yellow-400 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < f.rated ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                {f.rating && <p className="text-[#EAEAEA]">{f.rating}</p>}
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={handleSubmitFeedback}
          className="bg-[#2C2C3A] border border-[#4A90E2] rounded-md p-4 space-y-3 text-sm"
        >
          <p className="font-semibold mb-1">Laisser un avis</p>

          <div className="flex items-center gap-2">
            <span>Votre note :</span>
            <div className="flex text-xl">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setNewRating(v)}
                    className={v <= newRating ? "text-yellow-400" : "text-gray-600"}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Votre commentaire (optionnel)"
              className="w-full rounded-md bg-[#1E1E2F] border border-[#4A90E2] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={feedbackLoading}
            className="rounded-md bg-[#F5A623] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] disabled:opacity-50"
          >
            {feedbackLoading ? "Envoi..." : "Envoyer mon avis"}
          </button>
        </form>
      </div>
    </div>
  );
}
