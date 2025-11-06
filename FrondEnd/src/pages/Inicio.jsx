import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import Navbar_inicio from "../components/Navbar_inicio";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";
import sampleCities from "../data/sampleCities";
import useDebounce from "../hooks/useDebounce";
import Fuse from "fuse.js";

export default function Inicio() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [cities] = useState(sampleCities);
  const [activeTags, setActiveTags] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const heroImages = [
    "/IMG/img1.png",
    "/IMG/img2.png",
    "/IMG/img3.png",
    "/IMG/img4.png",
    "/IMG/CALI.png",
    "/IMG/BOGOTA.png",
  ];

  // 🔹 cambio automático de fondo (efecto dinámico)
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 configuración de búsqueda con fuse.js
  const fuse = useMemo(() => {
    return new Fuse(cities, {
      keys: ["name", "tags", "summary"],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [cities]);

  const availableTags = useMemo(() => {
    const s = new Set();
    cities.forEach((c) => (c.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [cities]);

  const results = useMemo(() => {
    const q = debouncedQuery && debouncedQuery.trim();
    let list = cities;
    if (q) list = fuse.search(q).map((x) => x.item);
    if (activeTags.length) {
      list = list.filter((c) => (c.tags || []).some((t) => activeTags.includes(t)));
    }
    return list;
  }, [cities, fuse, debouncedQuery, activeTags]);

  return (
    <>
      {/* 🔹 NAVBAR DE INICIO */}
      <Navbar_inicio
        user={{
          name: "Carlos Yused Bernal",
          email: "carlos@nemcatacoa.com",
          photo: "/IMG/perfil.png",
        }}
        onLogout={() => console.log("Sesión cerrada")}
      />

      <main className="main-content">
        {/* 🔹 HERO DINÁMICO */}
        <section className="hero-dynamic position-relative text-center text-white">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImages[imageIndex]}
              src={heroImages[imageIndex]}
              className="hero-img"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
              alt="Paisaje de Colombia"
            />
          </AnimatePresence>

          <div className="hero-overlay d-flex flex-column justify-content-center align-items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="display-5 fw-bold"
            >
              ¿Listo para conocer NEMCATACOA?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lead"
            >
              Tecnología que honra cultura, historia y territorio colombiano.
            </motion.p>
          </div>
        </section>

        {/* 🔹 SECCIÓN DE RUTAS */}
        <section className="routes-section py-5 bg-light">
          <div className="container">
            <h2 className="fw-bold text-center mb-3">Rutas culturales</h2>
            <p className="text-muted text-center mb-4">
              Explora ciudades y rutas diseñadas para descubrir patrimonio, arte y gastronomía.
            </p>

            <div className="input-group mb-4">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar ciudad o tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">
                Buscar
              </button>
            </div>

            {/* 🔹 Filtros por tags */}
            <div className="mb-4 text-center">
              <small className="text-muted me-2">Filtrar por:</small>
              {availableTags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    className={`btn btn-sm me-2 ${active ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() =>
                      setActiveTags((prev) =>
                        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                      )
                    }
                  >
                    {tag}
                  </button>
                );
              })}
              {activeTags.length > 0 && (
                <button className="btn btn-sm btn-link ms-2" onClick={() => setActiveTags([])}>
                  Limpiar
                </button>
              )}
            </div>

            <div className="row g-4">
              {results.length === 0 && (
                <div className="col-12">
                  <div className="alert alert-warning">
                    No se encontraron rutas que coincidan.
                  </div>
                </div>
              )}

              {results.map((c) => (
                <div key={c.id} className="col-12 col-md-6 col-lg-4">
                  <CityCard city={c} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
