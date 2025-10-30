import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
import sampleCities from "../data/sampleCities";
import { useState, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import Fuse from 'fuse.js';

export default function Inicio() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 250);
  const [cities] = useState(sampleCities);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    // Inicializar el carrusel de Bootstrap manualmente
    if (window.bootstrap && window.bootstrap.Carousel) {
      const carouselElement = document.getElementById('carouselExampleIndicators');
      if (carouselElement) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 5000,
          ride: 'carousel',
        });
      }
    }
  }, []);

  // preparar fuse.js (memorizado para no recrearlo en cada render)
  const fuse = useMemo(() => {
    return new Fuse(cities, {
      keys: ['name', 'tags', 'summary'],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [cities]);

  // tags disponibles (únicos)
  const availableTags = useMemo(() => {
    const s = new Set();
    cities.forEach((c) => (c.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [cities]);

  // resultados basados en búsqueda fuzzy + filtros por tags
  const results = useMemo(() => {
    const q = debouncedQuery && debouncedQuery.trim();
    let list = cities;
    if (q) {
      const r = fuse.search(q).map((x) => x.item);
      list = r;
    }
    if (activeTags.length) {
      list = list.filter((c) => (c.tags || []).some((t) => activeTags.includes(t)));
    }
    return list;
  }, [cities, fuse, debouncedQuery, activeTags]);

  return (
    <>
      <main className="main-content">
      <section className="home-section text-center">
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
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></button>
          </div>

          {/* Imágenes */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/IMG/img1.png" className="carousel-fixed" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="/IMG/img2.png" className="carousel-fixed" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="/IMG/img3.png" className="carousel-fixed" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src="/IMG/img4.png" className="carousel-fixed" alt="Slide 4" />
            </div>
            <div className="carousel-item">
              <img src="/IMG/CALI.png" className="carousel-fixed" alt="Slide 5" />
            </div>
            <div className="carousel-item">
              <img src="/IMG/BOGOTA.png" className="carousel-fixed" alt="Slide 6" />
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

        {/* Botón CTA */}
        <div className="mt-5">
          <Link to="/register" className="btn btn-primary btn-lg shadow">
            Quiero conocer más
          </Link>
        </div>

        {/* Buscador y grid movidos a una sección separada (routes-section) */}
      </section>

      </main>

      {/* Nueva sección de Rutas culturales - separada del carrusel y con color distinto */}
      <section className="routes-section">
        <div className="routes-container">
          <h2 className="mb-3">Rutas culturales</h2>
          <p className="text-muted">Explora ciudades y rutas diseñadas para descubrir patrimonio, arte y gastronomía.</p>

          <div className="mt-4 mb-3">
              <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar ciudad o tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">Buscar</button>
            </div>

            {/* filtros por tags */}
            <div className="mb-3">
              <small className="text-muted me-2">Filtrar por:</small>
              {availableTags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    className={`btn btn-sm me-2 ${active ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => {
                      if (active) setActiveTags(activeTags.filter((t) => t !== tag));
                      else setActiveTags([...activeTags, tag]);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
              {activeTags.length > 0 && (
                <button className="btn btn-sm btn-link ms-2" onClick={() => setActiveTags([])}>Limpiar</button>
              )}
            </div>

            <div className="row g-4">
              {results.length === 0 && (
                <div className="col-12">
                  <div className="alert alert-warning">No se encontraron rutas que coincidan.</div>
                </div>
              )}

              {results.map((c) => (
                <div key={c.id} className="col-12 col-md-6 col-lg-4">
                  <CityCard city={c} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>

  );
}
