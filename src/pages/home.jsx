import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/css/home.css";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    // Inicializar carrusel
    if (window.bootstrap && window.bootstrap.Carousel) {
      const el = document.getElementById("heroCarousel");
      if (el) new window.bootstrap.Carousel(el, { interval: 5000, ride: "carousel" });
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero-section text-center text-white">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="./IMG/img1.png" className="d-block w-100 hero-img" alt="Colombia" />
              <div className="carousel-caption">
                <h1 className="display-5 fw-bold">Bienvenido a NEMCATACOA</h1>
                <p>Conectando tecnología, cultura y territorio colombiano.</p>
                <Link to="/inicio" className="btn btn-light mt-3">Explorar rutas</Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/IMG/colombia2.jpg" className="d-block w-100 hero-img" alt="Cultura" />
              <div className="carousel-caption">
                <h1 className="display-5 fw-bold">Descubre la esencia de Colombia</h1>
                <p>Una experiencia inmersiva de historia, arte y gastronomía.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/IMG/colombia3.jpg" className="d-block w-100 hero-img" alt="Naturaleza" />
              <div className="carousel-caption">
                <h1 className="display-5 fw-bold">Rutas que cuentan historias</h1>
                <p>Viaja por las ciudades que marcaron nuestra identidad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NEMCATACOA */}
      <section className="about-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">¿Qué es NEMCATACOA?</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "750px" }}>
            NEMCATACOA es una plataforma digital dedicada a honrar la riqueza cultural, histórica y
            gastronómica de Colombia. Buscamos integrar tecnología e identidad, creando rutas
            turísticas que permitan conectar al visitante con el alma de cada región.
          </p>
        </div>
      </section>

      {/* HISTORIA DE COLOMBIA */}
      <section className="history-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Un poco de historia</h2>
          <div className="row align-items-center">
            <div className="col-md-6 mb-3">
              <img
                src="/IMG/historia_colombia.jpg"
                className="img-fluid rounded shadow"
                alt="Historia de Colombia"
              />
            </div>
            <div className="col-md-6">
              <p className="text-muted">
                Colombia, tierra de diversidad, fue el hogar de culturas precolombinas como los
                Muiscas, Quimbayas y Tayronas. Su historia se teje entre la tradición indígena, la
                influencia colonial y el mestizaje cultural que define su identidad actual.
              </p>
              <p className="text-muted">
                Desde los Andes hasta el Caribe, Colombia ofrece una mezcla única de música,
                gastronomía, arte y paisajes que narran siglos de evolución y resistencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RUTAS DESTACADAS */}
      <section className="routes-section py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Rutas destacadas</h2>
          <p className="text-muted text-center mb-5">
            Explora algunas de las experiencias culturales más representativas del país.
          </p>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/IMG/BOGOTA.png" className="card-img-top" alt="Bogotá" />
                <div className="card-body">
                  <h5 className="card-title">Ruta de la Sabana - Bogotá</h5>
                  <p className="card-text">
                    Conoce la capital desde una nueva perspectiva: museos, arquitectura y
                    gastronomía andina te esperan en esta ruta cultural.
                  </p>
                  <Link to="/inicio" className="btn btn-outline-primary btn-sm">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/IMG/CALI.png" className="card-img-top" alt="Cali" />
                <div className="card-body">
                  <h5 className="card-title">Ruta del Sabor - Cali</h5>
                  <p className="card-text">
                    Vive la salsa, el sabor y la alegría del Pacífico colombiano en una experiencia
                    llena de ritmo y tradición culinaria.
                  </p>
                  <Link to="/inicio" className="btn btn-outline-primary btn-sm">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/IMG/cartagena.jpg" className="card-img-top" alt="Cartagena" />
                <div className="card-body">
                  <h5 className="card-title">Ruta Colonial - Cartagena</h5>
                  <p className="card-text">
                    Recorre las murallas y las calles coloniales de una de las joyas históricas más
                    emblemáticas del Caribe colombiano.
                  </p>
                  <Link to="/inicio" className="btn btn-outline-primary btn-sm">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}




