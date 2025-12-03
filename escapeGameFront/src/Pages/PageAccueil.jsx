import Carrousel from "../Components/Carroussel";
import HeroHeaderImage from "../assets/HERO HEADER.png";

function PageAccueil() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#1E1E2F] text-[#EAEAEA]">
      {/* Supprimer les soulignements de tous les liens dans cette page car ça ne faisait pas propre*/}
      <style>
        {`
          a {
            text-decoration: none;
          }
        `}
      </style>


      {/* Hero Header */}
      <section
        className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center text-center px-4 md:px-0"
        style={{
          backgroundImage: `url(${HeroHeaderImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="font-montserrat font-bold text-[36px] md:text-[48px] text-white">
            Bienvenue sur Escape Game
          </h1>
          <p className="font-openSans text-[16px] md:text-[18px] mt-4 text-[#EAEAEA]">
            Découvrez nos aventures immersives
          </p>

          {/* Bouton Réserver */}
          <button className="mt-6 px-6 py-3 bg-[#F5A623] text-white font-roboto font-bold text-[18px] rounded hover:bg-[#D98C1F] transition-colors duration-300">
            Réserver
          </button>
        </div>
      </section>

      {/* Titre du carrousel */}
      <section className="text-center mt-12">
        <h2 className="font-montserrat font-semibold text-[28px] text-[#F5A623]">
          Nos Escapes Games Populaires
        </h2>
      </section>

      {/* Carrousel centré */}
      <main className="flex justify-center mt-6 px-4 md:px-8">
        <div className="w-full max-w-[1200px]">
          <Carrousel />
        </div>
      </main>

    </div>
  );
}

export default PageAccueil;
