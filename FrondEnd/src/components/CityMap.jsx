// src/components/CityMap.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// 🛑 BLOQUE CORREGIDO PARA ARREGLAR LOS ÍCONOS DE LEAFLET
// 1. Eliminar la propiedad 'iconRetinaUrl' del prototipo para evitar el error de ruta
//    (Este es el fix estándar para el problema de los marcadores en Webpack/Vite)
delete L.Icon.Default.prototype._getIconUrl;

// 2. Definir las rutas de los íconos (usando rutas absolutas de un CDN)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
// 🛑 FIN DEL BLOQUE CORREGIDO


export default function CityMap({ coords, name }) {}