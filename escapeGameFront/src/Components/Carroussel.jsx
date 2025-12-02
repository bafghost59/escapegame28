import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import slide1 from "../assets/imgcarrousel1.png";
import slide2 from "../assets/imgcarrousel2.png";
import slide3 from "../assets/imgcarrousel3.png";

function Carrousel() {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Slides */}
      <div className="carousel-inner rounded">
        <div className="carousel-item active">
          <img
            src={slide1}
            className="d-block w-100"
            alt="Slide 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src={slide2}
            className="d-block w-100"
            alt="Slide 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src={slide3}
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
          style={{ filter: "invert(1)" }}
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
