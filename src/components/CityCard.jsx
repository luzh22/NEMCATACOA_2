import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import useFavorites from '../hooks/useFavorites';
import './CityCard.css';

export default function CityCard({ city }) {
  const { name, summary, images = [], tags = [], duration, rating, slug, id } = city;
  const img = images[0] || '/IMG/img1.png';
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article className="city-card card h-100 shadow-sm">
      <div className="card-img-top city-img-wrap">
        <img src={img} alt={`Imagen de ${name}`} loading="lazy" className="city-img" />
        <div className="city-badges">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="badge bg-secondary me-1">{t}</span>
          ))}
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <div className="city-meta mb-2">
          <small className="text-muted">{duration} • {rating ? `★ ${rating}` : '—'}</small>
        </div>
        <p className="card-text city-summary">{summary ? (summary.length > 120 ? summary.slice(0, 120) + '…' : summary) : ''}</p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/rutas/${city.id}`} className="btn btn-primary btn-sm">Ver ruta</Link>
          <button 
            onClick={(e) => {
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
