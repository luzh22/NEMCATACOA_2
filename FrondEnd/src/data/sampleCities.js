

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
    id: 'cartagena',
    slug: 'cartagena',
    name: 'Cartagena',
    summary: 'Ciudad amurallada con arquitectura colonial, música y gastronomía caribeña. Perfecta para rutas históricas.',
  images: ['/IMG/CARTAGENA.png'],
    tags: ['Historia', 'Playa'],
    duration: '2-3 días',
    rating: 4.8,
    coords: { lat: 10.391, lng: -75.479 },
    description: 'Cartagena, la joya del Caribe colombiano, combina historia, cultura y playas paradisíacas. Su ciudad amurallada, arquitectura colonial y ambiente vibrante la convierten en uno de los destinos más encantadores de América Latina.',
bestSeason: 'Diciembre a Abril',
pointsOfInterest: [
  {
    name: 'Ciudad Amurallada',
    description: 'Centro histórico con calles empedradas, balcones coloniales y una atmósfera llena de historia.'
  },
  {
    name: 'Castillo de San Felipe de Barajas',
    description: 'Imponente fortaleza construida por los españoles para defender la ciudad de ataques piratas.'
  },
  {
    name: 'Islas del Rosario',
    description: 'Archipiélago de islas con aguas cristalinas, ideales para el buceo y el descanso.'
  }
]

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
    coords: { lat: 6.230, lng: -73.176 },
    description: 'Santander, tierra de aventura y naturaleza, es reconocido por sus paisajes montañosos, deportes extremos y deliciosa gastronomía. Bucaramanga, su capital, es conocida como la Ciudad de los Parques.',
bestSeason: 'Junio a Septiembre',
pointsOfInterest: [
  {
    name: 'Cañón del Chicamocha',
    description: 'Majestuoso cañón con miradores, teleférico y actividades de aventura como parapente y senderismo.'
  },
  {
    name: 'Barichara',
    description: 'Pueblo colonial considerado uno de los más bellos de Colombia, con calles empedradas y arquitectura tradicional.'
  },
  {
    name: 'Parque Nacional del Chicamocha (Panachi)',
    description: 'Parque turístico con vistas espectaculares del cañón y atracciones familiares.'
  }
]

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
    coords: { lat: 3.437, lng: -76.522 },
    description: 'Cali, la capital mundial de la salsa, vibra con ritmo, alegría y cultura. Su gente amable, vida nocturna y cercanía con la naturaleza la convierten en una ciudad llena de energía y sabor.',
bestSeason: 'Diciembre a Marzo',
pointsOfInterest: [
  {
    name: 'Cristo Rey',
    description: 'Monumento icónico con una vista panorámica de toda la ciudad.'
  },
  {
    name: 'Barrio San Antonio',
    description: 'Zona histórica con casas coloniales, cafés bohemios y una vibrante escena cultural.'
  },
  {
    name: 'Zoológico de Cali',
    description: 'Uno de los mejores zoológicos de Latinoamérica, ideal para visitar en familia.'
  }
]

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
    coords: { lat: 2.444, lng: -76.614 },
    description: 'Popayán, conocida como la Ciudad Blanca, destaca por su arquitectura colonial, tradiciones religiosas y gastronomía. Es uno de los centros históricos más importantes y mejor conservados de Colombia.',
bestSeason: 'Julio a Septiembre',
pointsOfInterest: [
  {
    name: 'Centro Histórico de Popayán',
    description: 'Zona colonial con iglesias, plazas y casas blancas que reflejan la herencia española.'
  },
  {
    name: 'Puente del Humilladero',
    description: 'Emblemático puente de arcos que conecta el centro con la zona norte de la ciudad.'
  },
  {
    name: 'Semana Santa de Popayán',
    description: 'Celebración religiosa declarada Patrimonio Inmaterial de la Humanidad por la UNESCO.'
  }
]

  },
  {
  id: 'ipiales',
  slug: 'ipiales',
  name: 'Ipiales',
  summary: 'Ciudad fronteriza famosa por el Santuario de Las Lajas y su impresionante arquitectura gótica. Ideal para turismo religioso y paisajístico.',
  images: ['/IMG/img1.png'],
  tags: ['Religión', 'Naturaleza'],
  duration: '1-2 días',
  rating: 4.7,
  coords: { lat: 0.825, lng: -77.64 },
  description: 'Ipiales, ubicada en el departamento de Nariño, es conocida como “la Ciudad de las Nubes Verdes”. Su joya más reconocida es el Santuario de Las Lajas, una basílica construida sobre un cañón que atrae a miles de peregrinos cada año. Además, su cercanía con la frontera ecuatoriana la convierte en un punto estratégico para viajeros entre Colombia y Ecuador.',
  bestSeason: 'Junio a Septiembre',
  pointsOfInterest: [
    {
      name: 'Santuario de Las Lajas',
      description: 'Impresionante iglesia neogótica construida sobre un cañón del río Guáitara, considerada una de las más bellas del mundo.'
    },
    {
      name: 'Puente de Rumichaca',
      description: 'Punto fronterizo entre Colombia y Ecuador, con vistas panorámicas del valle andino.'
    },
    {
      name: 'Laguna de La Bolsa',
      description: 'Hermoso entorno natural ideal para caminatas y fotografía paisajística.'
    }
  ]
},
{
  id: 'cucuta',
  slug: 'cucuta',
  name: 'Cúcuta',
  summary: 'Ciudad fronteriza cálida y comercial, con historia y espacios culturales que reflejan la identidad del norte colombiano.',
  images: ['/IMG/CUCUTA.png'],
  tags: ['Historia', 'Cultura'],
  duration: '1-2 días',
  rating: 4.3,
  coords: { lat: 7.893, lng: -72.507 },
  description: 'Cúcuta, capital del departamento de Norte de Santander, combina historia, comercio y hospitalidad. Fue sede de la Constitución de 1821, un hecho clave en la independencia de Colombia. Hoy ofrece parques, monumentos históricos y una gastronomía que refleja la influencia de la frontera con Venezuela.',
  bestSeason: 'Diciembre a Marzo',
  pointsOfInterest: [
    {
      name: 'Parque Santander',
      description: 'Corazón histórico y social de la ciudad, rodeado de arquitectura colonial y moderna.'
    },
    {
      name: 'Casa de la Bagatela',
      description: 'Lugar donde se firmó la Constitución de 1821, pieza clave en la historia de Colombia.'
    },
    {
      name: 'Malecón de Cúcuta',
      description: 'Espacio moderno junto al río Pamplonita, ideal para caminar, ejercitarse y disfrutar la gastronomía local.'
    }
  ]
},
{
  id: 'medellin',
  slug: 'medellin',
  name: 'Medellín',
  summary: 'Ciudad moderna e innovadora rodeada de montañas, conocida por su clima primaveral y su transformación urbana.',
  images: ['/IMG/MEDELLIN.png'],
  tags: ['Innovación', 'Cultura'],
  duration: '2-3 días',
  rating: 4.8,
  coords: { lat: 6.251, lng: -75.563 },
  description: 'Medellín, la ciudad de la eterna primavera, es un ejemplo de transformación urbana y social. Sus innovadores espacios públicos, sistema de transporte y proyectos culturales la han convertido en un referente mundial de innovación, sostenibilidad y cultura.',
  bestSeason: 'Marzo a Mayo',
  pointsOfInterest: [
    {
      name: 'Parque Arví',
      description: 'Parque ecológico con senderos naturales, actividades culturales y vistas espectaculares del valle de Aburrá.'
    },
    {
      name: 'Plaza Botero',
      description: 'Exhibición al aire libre de las famosas esculturas del artista Fernando Botero, ubicada en el corazón del centro.'
    },
    {
      name: 'Comuna 13',
      description: 'Ejemplo de transformación social a través del arte, el color y la cultura urbana.'
    }
  ]
},
{
  id: 'melgar',
  slug: 'melgar',
  name: 'Melgar',
  summary: 'Destino turístico popular por su clima cálido, parques acuáticos y cercanía a Bogotá. Ideal para escapadas de fin de semana.',
  images: ['/IMG/MELGAR.png'],
  tags: ['Naturaleza', 'Aventura'],
  duration: '1-2 días',
  rating: 4.5,
  coords: { lat: 4.204, lng: -74.640 },
  description: 'Melgar, ubicado en el departamento del Tolima, es uno de los destinos preferidos por los capitalinos para descansar y disfrutar del sol. Conocido como “la Ciudad de las Piscinas”, ofrece una amplia variedad de parques acuáticos, balnearios naturales y actividades de aventura. Su ambiente relajado y su clima cálido durante todo el año lo convierten en el lugar ideal para desconectarse del estrés urbano.',
  bestSeason: 'Diciembre a Marzo',
  pointsOfInterest: [
    {
      name: 'Piscilago',
      description: 'Uno de los parques acuáticos más grandes de Colombia, con toboganes, zoológico y atracciones familiares.'
    },
    {
      name: 'Río Sumapaz',
      description: 'Río de aguas cristalinas ideal para nadar y realizar paseos ecológicos en sus alrededores.'
    },
    {
      name: 'Parque Ecológico Ciudad Reptilia',
      description: 'Centro de conservación con reptiles, senderos ecológicos y actividades educativas para toda la familia.'
    }
  ]
}




];

export default cities;

