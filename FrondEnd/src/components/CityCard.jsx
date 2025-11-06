import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import useFavorites from '../hooks/useFavorites';
import './CityCard.css';

// Constante para el límite del resumen (Mejora la legibilidad)
const MAX_SUMMARY_LENGTH = 120;

export default function CityCard({ city }) {
    // Desestructuración robusta y limpia
    const { 
        name, 
        summary, 
        images = [], 
        tags = [], 
        duration, 
        rating, 
        id // Usamos 'id' en lugar de 'slug' para la ruta y favoritos
    } = city;
    
    const img = images[0] || '/IMG/img1.png';
    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <article className="city-card card h-100 shadow-sm">
            
            {/* 🖼️ Área de Imagen y Tags */}
            <div className="card-img-top city-img-wrap">
                <img 
                    src={img} 
                    alt={`Imagen de ${name}`} 
                    loading="lazy" 
                    className="city-img" 
                />
                <div className="city-badges">
                    {/* Limitar a un máximo de 3 tags */}
                    {tags.slice(0, 3).map((t) => (
                        <span key={t} className="badge bg-secondary me-1">{t}</span>
                    ))}
                </div>
            </div>
            
            {/* 📝 Cuerpo de la Tarjeta */}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name}</h5>
                
                {/* ✨ Rating y Duración Mejorados (Con estrellas visuales) */}
                <div className="city-meta mb-2 d-flex align-items-center">
                    <small className="text-muted me-2">{duration}</small>
                    
                    {rating && (
                        <span className="text-warning d-flex align-items-center">
                            {/* Genera 5 estrellas, coloreando según el rating */}
                            {Array.from({ length: 5 }, (_, i) => (
                                <span 
                                    key={i} 
                                    // Controla el color para simular estrellas llenas/vacías
                                    style={{ color: i < Math.floor(rating) ? 'gold' : '#ccc', fontSize: '1em' }}
                                >
                                    ★
                                </span>
                            ))}
                        </span>
                    )}
                    {/* Mostrar el valor numérico al lado */}
                    {rating && <small className="text-muted ms-1">({rating})</small>}
                </div>
                
                {/* Resumen limitado por la constante */}
                <p className="card-text city-summary">
                    {summary
                        ? (summary.length > MAX_SUMMARY_LENGTH
                            ? summary.slice(0, MAX_SUMMARY_LENGTH) + '…'
                            : summary)
                        : 'Descripción no disponible.'}
                </p>

                {/* 🔗 Acciones (Ver Ruta y Favoritos) */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link to={`/rutas/${id}`} className="btn btn-primary btn-sm">Ver ruta</Link>
                    
                    <button 
                        onClick={(e) => {
                            // Previene que el clic active la navegación del Link
                            e.preventDefault(); 
                            toggleFavorite(id);
                        }}
                        className={`btn ${isFavorite(id) ? 'btn-danger' : 'btn-outline-secondary'} btn-sm`}
                        aria-label={`${isFavorite(id) ? 'Quitar de' : 'Agregar a'} favoritos ${name}`}
                    >
                        <Heart
                            size={16}
                            fill={isFavorite(id) ? 'currentColor' : 'none'}
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}