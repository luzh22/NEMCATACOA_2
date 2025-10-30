import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import useFavorites from '../hooks/useFavorites';

// Importar datos de ejemplo (luego se reemplazará con API)
import cities from '../data/sampleCities';

export default function RouteDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [city, setCity] = useState(null);

  useEffect(() => {
    // Simular llamada a API
    const cityData = cities.find(c => c.id === id);
    setCity(cityData);
  }, [id]);

  if (!city) return <div className="loading">Cargando...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="route-detail container py-5"
    >
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative">
            <img
              src={city.images?.[0] || '/IMG/img1.png'}
              alt={city.name}
              className="img-fluid rounded-3 mb-4"
              style={{ height: '400px', width: '100%', objectFit: 'cover' }}
            />
            <button
              onClick={() => toggleFavorite(city.id)}
              className={`btn position-absolute top-0 end-0 m-3 ${
                isFavorite(city.id) ? 'btn-danger' : 'btn-light'
              }`}
            >
              <Heart fill={isFavorite(city.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <h1 className="mb-4">{city.name}</h1>
          
          <div className="mb-4">
            {city.tags.map((tag) => (
              <span key={tag} className="badge bg-secondary me-2">
                {tag}
              </span>
            ))}
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Información General</h5>
              <p className="card-text">{city.description}</p>
              <div className="row">
                <div className="col-6">
                  <strong>Duración recomendada:</strong>
                  <p>{city.duration}</p>
                </div>
                <div className="col-6">
                  <strong>Mejor temporada:</strong>
                  <p>{city.bestSeason || 'Todo el año'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Puntos de Interés</h5>
              <ul className="list-unstyled">
                {city.pointsOfInterest?.map((point, index) => (
                  <li key={index} className="mb-3">
                    <h6>{point.name}</h6>
                    <p className="text-muted mb-1">{point.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card sticky-top" style={{ top: '2rem' }}>
            <div className="card-body">
              <h5 className="card-title">Reservar esta ruta</h5>
              <p className="card-text">
                Contacta con nuestro equipo para planificar tu visita a {city.name}.
              </p>
              <button className="btn btn-primary w-100 mb-2">
                Reservar Ahora
              </button>
              <button className="btn btn-outline-secondary w-100">
                Solicitar Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}