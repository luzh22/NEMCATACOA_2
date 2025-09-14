import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Inicio() {
  return (
    <main className="main-content">
      <section className="home-section" >
        <div className="container">
          <h1>¿Listo para conocer NEMCATACOA?</h1>
          <p className="lead">Tecnología que honra países</p>
        </div>

        {/* Carrusel Bootstrap */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-4"
          data-bs-ride="carousel"
        >
          {/* Indicadores */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></button>
          </div>

          {/* Imágenes */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/img1.png" className="d-block w-100 custom-carousel" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="/img/img2.png" className="d-block w-100 custom-carousel" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="/img/img3.png" className="d-block w-100 custom-carousel" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src="/img/img4.png" className="d-block w-100 custom-carousel" alt="Slide 4" />
            </div>
          </div>

          {/* Controles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
    </main>
  );
}
