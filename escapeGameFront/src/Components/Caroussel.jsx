import { useState } from "react";
import img1 from "../assets/imgcarrousel1.png";
import img2 from "../assets/imgcarrousel2.png";
import img3 from "../assets/imgcarrousel3.png";

export default function CarouselEscapeGame() {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // Aller à l'image suivante
  const nextSlide = () => {
    setCurrent((current + 1) % images.length); // Boucle vers le début
  };

  // Aller à l'image précédente
  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length); // Boucle vers la fin
  };

  return (
    <div className="max-w-3xl mx-auto text-center bg-[#1E1E2F] p-4 rounded-lg">
      {/* Image */}
      <img
        src={images[current]}
        alt="Escape Game"
        className="w-full h-80 object-cover rounded-md"
      />

      {/* Flèches */}
      <div className="flex justify-between mt-2">
        <button
          onClick={prevSlide}
          className="bg-[#2C2C3A] text-white px-3 py-1 rounded hover:bg-[#357ABD]"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#2C2C3A] text-white px-3 py-1 rounded hover:bg-[#357ABD]"
        >
          ▶
        </button>
      </div>

      {/* Les 3 petits points du carroussel */}
      <div className="flex justify-center space-x-2 mt-3">
        {images.map((_, index) => ( // _ pour indiquer que la variable n'est pas utilisée donc ici on ignore la valeur de l'image
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-[#F5A623]" : "bg-[#CCCCCC]"
            }`}
          ></span>
        ))}
      </div>

      {/* Bouton Réserver */}
      <button className="mt-4 bg-[#F5A623] text-white font-bold px-6 py-2 rounded hover:bg-[#D98C1F]">
        Réserver
      </button>
    </div>
  );
}
