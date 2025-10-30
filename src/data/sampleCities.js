const cities = [
  {
    id: 'bogota',
    slug: 'bogota',
    name: 'Bogotá',
    summary: 'Capital con museos, arte urbano y gastronomía tradicional. Ideal para rutas culturales cortas y visitas a museos.',
  images: ['/IMG/BOGOTA.png'],
    tags: ['Historia', 'Arte'],
    duration: '1-2 días',
    rating: 4.6,
    coords: { lat: 4.711, lng: -74.072 },
    description: 'Bogotá, la capital de Colombia, es una ciudad que mezcla su rica historia colonial con la modernidad de una metrópolis en constante evolución. Sus calles empedradas en La Candelaria contrastan con los modernos edificios del norte, mientras que sus museos, teatros y festivales culturales la convierten en un destino imperdible.',
    bestSeason: 'Todo el año',
    pointsOfInterest: [
      {
        name: 'Museo del Oro',
        description: 'La colección de orfebrería prehispánica más grande del mundo.'
      },
      {
        name: 'Monserrate',
        description: 'Santuario con las mejores vistas de la ciudad.'
      },
      {
        name: 'La Candelaria',
        description: 'Barrio histórico con arquitectura colonial y republicana.'
      }
    ]
  },
  {
    id: 'medellin',
    slug: 'medellin',
    name: 'Medellín',
    summary: 'Conocida por su innovación, parques culturales y vida nocturna. Buen destino para experiencias urbanas.',
  images: ['/IMG/MEDELLIN.png'],
    tags: ['Arte', 'Innovación'],
    duration: '1-2 días',
    rating: 4.5,
    coords: { lat: 6.244, lng: -75.581 },
    description: 'Medellín, la ciudad de la eterna primavera, es un ejemplo de transformación urbana y social. Sus innovadores espacios públicos, sistema de transporte y proyectos culturales la han convertido en un referente mundial de innovación y cultura.',
    bestSeason: 'Marzo a Mayo',
    pointsOfInterest: [
      {
        name: 'Parque Arví',
        description: 'Parque ecológico con senderos y actividades culturales.'
      },
      {
        name: 'Plaza Botero',
        description: 'Exhibición al aire libre de las famosas esculturas de Fernando Botero.'
      },
      {
        name: 'Comuna 13',
        description: 'Ejemplo de transformación social a través del arte y la cultura.'
      }
    ]
  },
  {
    id: 'cartagena',
    slug: 'cartagena',
    name: 'Cartagena',
    summary: 'Ciudad amurallada con arquitectura colonial, música y gastronomía caribeña. Perfecta para rutas históricas.',
  images: ['/IMG/CARTAGENA.png'],
    tags: ['Historia', 'Playa'],
    duration: '2-3 días',
    rating: 4.8,
    coords: { lat: 10.391, lng: -75.479 }
  },
  {
    id: 'santander',
    slug: 'santander',
    name: 'Santander',
    summary: 'Región con paisajes naturales y municipios coloniales; ideal para combinar cultura y naturaleza.',
  images: ['/IMG/SANTANDER.png'],
    tags: ['Naturaleza', 'Historia'],
    duration: '2-4 días',
    rating: 4.4,
    coords: { lat: 6.230, lng: -73.176 }
  },
  {
    id: 'cali',
    slug: 'cali',
    name: 'Cali',
    summary: 'Capital de la salsa: música, gastronomía y cultura popular en cada barrio.',
  images: ['/IMG/CALI.png'],
    tags: ['Música', 'Gastronomía'],
    duration: '1-2 días',
    rating: 4.3,
    coords: { lat: 3.437, lng: -76.522 }
  },
  {
    id: 'popayan',
    slug: 'popayan',
    name: 'Popayán',
    summary: 'Ciudad blanca con rica tradición religiosa y arquitectónica; ideal para rutas culturales pausadas.',
  images: ['/IMG/POPAYAN.png'],
    tags: ['Historia', 'Religión'],
    duration: '1 día',
    rating: 4.2,
    coords: { lat: 2.444, lng: -76.614 }
  }
];

export default cities;
export { cities };
