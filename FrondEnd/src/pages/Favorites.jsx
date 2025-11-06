// src/pages/Favorites.jsx

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Importa los datos completos (el array grande)
import allCities from '../data/allCities'; 
// Importa tu hook de favoritos
import useFavorites from '../hooks/useFavorites';

// Importa los componentes de UI
import Navbar_inicio from '../components/Navbar_inicio';
import Footer from '../components/Footer';
import CityCard from '../components/CityCard';

export default function Favorites() {
    // 1. Obtener la lista de IDs de favoritos del hook
    const { favorites } = useFavorites();

    // 2. Usar useMemo para filtrar la lista completa de ciudades de forma eficiente
    const favoriteCities = useMemo(() => {
        // Filtrar allCities: mantener solo las ciudades cuyo ID está incluido en el array 'favorites'
        return allCities.filter(city => favorites.includes(city.id));
    }, [favorites]); // Se recalcula solo cuando cambia el array 'favorites'

    return (
        <>
            <Navbar_inicio />

            <motion.div
                className="container py-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2 className="text-center mb-5 fw-bold text-primary">
                    💙 Mis Rutas Favoritas ({favoriteCities.length})
                </h2>

                <div className="row g-4">
                    {/* 3. Mostrar mensaje si no hay favoritos */}
                    {favoriteCities.length === 0 && (
                        <div className="col-12 text-center">
                            <div className="alert alert-info" role="alert">
                                Aún no tienes rutas guardadas como favoritas. ¡Empieza a explorarlas!
                            </div>
                        </div>
                    )}

                    {/* 4. Mapear y mostrar las CityCards de las favoritas */}
                    {favoriteCities.map(city => (
                        <div key={city.id} className="col-12 col-sm-6 col-md-4">
                            <CityCard city={city} />
                        </div>
                    ))}
                </div>
            </motion.div>

            <Footer />
        </>
    );
}