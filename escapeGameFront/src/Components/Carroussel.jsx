import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import slide1 from "../assets/imgcarrousel1.png";
import slide2 from "../assets/imgcarrousel2.png";
import slide3 from "../assets/imgcarrousel3.png";

function Carrousel() {
  return (
    <div // conteneur principal du carrousel
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel" // défilement automatique des slides
    >
      {/* Slides */}
      <div className="carousel-inner rounded">
        <div className="carousel-item active">
          <img
            src={'https://www.planetexperiences.fr/images/home.jpg'}
            className="d-block w-100" // toute la largeur du conteneur
            alt="Slide 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src={'https://www.francebleu.fr/pikapi/images/6dbd4669-912e-4919-a387-8b5bd08d9374/1200x680?webp=false'}
            className="d-block w-100"
            alt="Slide 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src={'https://profpower.lelivrescolaire.fr/wp-content/uploads/2018/02/Capture-d%E2%80%99e%CC%81cran-2018-02-04-a%CC%80-14.41.58.png'}
            className="d-block w-100"
            alt="Slide 3"
          />
        </div>
      </div>

      {/* Flèches */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          style={{ filter: "invert(1)" }} // pour que les icones soient visibles sur fond c
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Avant</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          style={{ filter: "invert(1)" }}
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Après</span>
      </button>
    </div>
  );
}

export default Carrousel;
