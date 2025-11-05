import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nemcatacoa_favorites';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (cityId) => {
    setFavorites((prev) => [...new Set([...prev, cityId])]);
  };

  const removeFavorite = (cityId) => {
    setFavorites((prev) => prev.filter((id) => id !== cityId));
  };

  const toggleFavorite = (cityId) => {
    setFavorites((prev) => 
      prev.includes(cityId) 
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const isFavorite = (cityId) => favorites.includes(cityId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}