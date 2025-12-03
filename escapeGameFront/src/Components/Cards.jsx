// src/Components/Cards.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  imageUrl = "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
  title = "Title",
  subtitle = "Subtitle",
  description = "Lorem ipsum...",
  price = "xx.xx€",
  rating = 4,
  maxRating = 5,
  difficultyLabel = "Difficulté",
  durationLabel = "Durée",
  detailUrl, // URL de la page détail
}) {
  const stars = Array.from({ length: maxRating }, (_, i) => (
    <span
      key={i}
      className={i < rating ? "text-yellow-400" : "text-gray-500"}
    >
      ★
    </span>
  ));

  return (
    <div className="flex flex-col h-full bg-[#2C2C3A] text-white rounded-lg overflow-hidden border border-[#4A90E2] shadow-lg">
      <div className="h-56 w-full overflow-hidden">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 p-6 space-y-3">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-[#EAEAEA]">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#EAEAEA]">
          <span className="rounded-full border border-[#F5A623] px-2 py-0.5 text-[#F5A623]">
            {difficultyLabel}
          </span>
          <span>• {durationLabel}</span>
        </div>

        <p className="text-sm leading-relaxed text-[#EAEAEA] line-clamp-4">
          {description}
        </p>

        {detailUrl && (
          <div className="mt-1">
            <Link
              to={detailUrl}
              className="text-xs text-[#F5A623] hover:text-[#D98C1F] underline"
            >
              Voir plus
            </Link>
          </div>
        )}

        <div className="pt-2">
          <div className="flex gap-1 text-xl">{stars}</div>
          <p className="mt-1 text-sm text-[#EAEAEA]">
            Prix : <span className="font-semibold text-white">{price}</span>
          </p>
        </div>


        <div className="pt-3 mt-auto">
          <button className="w-full rounded-md bg-[#F5A623] py-2 text-sm font-semibold text-white hover:bg-[#D98C1F] transition-colors">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}








