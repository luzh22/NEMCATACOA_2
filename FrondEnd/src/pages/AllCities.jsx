// src/pages/CityList.jsx o AllCities.jsx

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; 

// Importa los datos completos (el array grande)
import allCities from "../data/allCities"; 

// Importa los componentes
import Navbar_inicio from "../components/Navbar_inicio";
import Footer from "../components/Footer";
import CityCard from "../components/CityCard";

// Importa herramientas de búsqueda (asumiendo que los tienes)
import useDebounce from "../hooks/useDebounce"; 
import Fuse from "fuse.js"; 


export default function CityList() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [activeTags, setActiveTags] = useState([]);

  // Usamos allCities como fuente de datos
  const cities = allCities; 

  // 1. Configuración de búsqueda (Memoizado para rendimiento)
  const fuse = useMemo(() => {
    return new Fuse(cities, {
      keys: ["name", "tags", "summary"],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [cities]);

  // 2. Extracción de Tags Disponibles (Memoizado)
  const availableTags = useMemo(() => {
    const s = new Set();
    cities.forEach((c) => (c.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [cities]);
  
  // 3. Lógica de Filtrado (Busqueda + Tags)
  const filteredCities = useMemo(() => {
    const q = debouncedQuery && debouncedQuery.trim();
    let list = cities;
    
    // A. Filtrar por Búsqueda de texto (Fuse.js)
    if (q) {
      list = fuse.search(q).map((x) => x.item);
    }
    
    // B. Filtrar por Tags activos
    if (activeTags.length) {
      // Muestra la ciudad si *al menos un* tag de la ciudad coincide con un tag activo
      list = list.filter((c) => (c.tags || []).some((t) => activeTags.includes(t)));
    }
    
    return list;
  }, [cities, fuse, debouncedQuery, activeTags]);
  
  // 4. Función de manejo de Tags (Limpia la query al cambiar tags)
  const handleTagClick = (tag) => {
    // 💡 UX: Limpia la búsqueda para evitar resultados confusos
    setQuery(""); 
    
    setActiveTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };


  return (
    <>
      <Navbar_inicio />

      <motion.div
        className="container py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-center mb-5 fw-bold text-primary">
          Explora Todas las Rutas Turísticas
        </h2>

        {/* 🔍 BLOQUE DE BÚSQUEDA Y FILTRADO */}
        <div className="mb-5 p-3 border rounded shadow-sm bg-white">
            
            {/* Input de Búsqueda */}
            <div className="mb-4">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Buscar ciudad, etiqueta o resumen..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            
            {/* Filtros por Tags */}
            <div className="mb-2 text-center">
              <small className="text-muted me-2 fw-bold">Filtrar por interés:</small>
              {availableTags.map((tag) => {
                const active = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    className={`btn btn-sm me-2 mb-2 ${active ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
              
              {/* Botón Limpiar Tags */}
              {activeTags.length > 0 && (
                <button 
                    className="btn btn-sm btn-link ms-2 mb-2" 
                    onClick={() => setActiveTags([])}
                >
                  Limpiar filtros
                </button>
              )}
            </div>
            
        </div>
        {/* FIN: BLOQUE DE BÚSQUEDA Y FILTRADO */}


        {/* 🗺️ RESULTADOS */}
        <div className="row g-4">
            
          {/* Mensaje de No Resultados */}
          {filteredCities.length === 0 && (
            <div className="col-12">
              <div className="alert alert-warning text-center">
                No se encontraron ciudades que coincidan con los criterios de búsqueda y filtros.
              </div>
            </div>
          )}

          {/* Mapeo de Tarjetas */}
          {filteredCities.map((c) => (
            <div key={c.id} className="col-12 col-sm-6 col-md-4">
              <CityCard city={c} />
            </div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </>
  );
}