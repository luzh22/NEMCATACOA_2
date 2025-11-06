

const allcities = [
  {
    id: 'bogota',
    slug: 'bogota',
    name: 'Bogotá',
    summary: 'Capital con museos, arte urbano y gastronomía tradicional. Ideal para rutas culturales cortas y visitas a museos.',
    images: ['/IMG/BOGOTA.png'],
    tags: ['Historia', 'Arte', 'Gastronomía'],
    duration: '1-2 días',
    rating: 4.6,
    coords: { lat: 4.711, lng: -74.072 },
    description:
      'Bogotá, la capital de Colombia, mezcla su rica historia colonial con la modernidad de una metrópolis vibrante. Desde los cerros orientales hasta el bullicio del centro histórico, es un destino ideal para quienes buscan arte, cultura y buena comida.',
    bestSeason: 'Todo el año',
    pointsOfInterest: [
      { name: 'Museo del Oro', description: 'Colección de orfebrería prehispánica única en el mundo.' },
      { name: 'Monserrate', description: 'Santuario con las mejores vistas de la ciudad.' },
      { name: 'La Candelaria', description: 'Barrio colonial lleno de historia y arte callejero.' },
    ],
  },
  {
    id: 'medellin',
    slug: 'medellin',
    name: 'Medellín',
    summary: 'La ciudad de la eterna primavera, reconocida por su innovación y paisajes montañosos.',
    images: ['/IMG/MEDELLIN.png'],
    tags: ['Innovación', 'Cultura', 'Naturaleza'],
    duration: '2-3 días',
    rating: 4.8,
    coords: { lat: 6.2518, lng: -75.5636 },
    description:
      'Medellín se ha transformado en una de las ciudades más innovadoras del mundo. Rodeada de montañas, ofrece experiencias culturales, gastronómicas y tecnológicas en un entorno acogedor.',
    bestSeason: 'Todo el año',
    pointsOfInterest: [
      { name: 'Pueblito Paisa', description: 'Réplica de un pueblo antioqueño tradicional con vista panorámica.' },
      { name: 'Comuna 13', description: 'Murales coloridos, escaleras eléctricas y arte urbano.' },
      { name: 'Jardín Botánico', description: 'Espacio natural en pleno corazón de la ciudad.' },
    ],
  },
  {
    id: 'cartagena',
    slug: 'cartagena',
    name: 'Cartagena de Indias',
    summary: 'Ciudad amurallada con historia colonial y playas caribeñas.',
    images: ['/IMG/CARTAGENA.png'],
    tags: ['Historia', 'Playa', 'Patrimonio'],
    duration: '3-4 días',
    rating: 4.9,
    coords: { lat: 10.391, lng: -75.479 },
    description:
      'Cartagena es una joya del Caribe colombiano. Su ciudad amurallada, calles coloridas y playas cercanas la convierten en uno de los destinos más visitados del país.',
    bestSeason: 'Diciembre a abril',
    pointsOfInterest: [
      { name: 'Ciudad Amurallada', description: 'Centro histórico con calles coloniales y plazas icónicas.' },
      { name: 'Castillo de San Felipe', description: 'Fortaleza militar española con vistas al puerto.' },
      { name: 'Islas del Rosario', description: 'Archipiélago con aguas cristalinas y arrecifes de coral.' },
    ],
  },
  {
    id: 'santamarta',
    slug: 'santamarta',
    name: 'Santa Marta',
    summary: 'Puerta de entrada al Parque Tayrona y la Sierra Nevada.',
    images: ['/IMG/SANTA_MARTA.png'],
    tags: ['Playa', 'Naturaleza', 'Aventura'],
    duration: '3-5 días',
    rating: 4.7,
    coords: { lat: 11.2408, lng: -74.199 },
    description:
      'Santa Marta combina playas caribeñas con la majestuosidad de la Sierra Nevada. Es ideal para quienes buscan naturaleza y tranquilidad.',
    bestSeason: 'Diciembre a abril',
    pointsOfInterest: [
      { name: 'Parque Tayrona', description: 'Playas vírgenes y senderos naturales.' },
      { name: 'Taganga', description: 'Pequeño pueblo pesquero con encanto y buceo.' },
      { name: 'Quinta de San Pedro Alejandrino', description: 'Casa donde murió Simón Bolívar.' },
    ],
  },
  {
    id: 'cali',
    slug: 'cali',
    name: 'Cali',
    summary: 'Capital mundial de la salsa con ambiente alegre y multicultural.',
    images: ['/IMG/CALI.png'],
    tags: ['Música', 'Baile', 'Cultura'],
    duration: '2-3 días',
    rating: 4.5,
    coords: { lat: 3.4516, lng: -76.5319 },
    description:
      'Cali es ritmo, sabor y alegría. La capital vallecaucana ofrece una vibrante vida nocturna, arte urbano y tradiciones afrocolombianas.',
    bestSeason: 'Diciembre a febrero',
    pointsOfInterest: [
      { name: 'Cristo Rey', description: 'Monumento icónico con vista panorámica de la ciudad.' },
      { name: 'Barrio San Antonio', description: 'Zona bohemia con cafés, murales y arquitectura colonial.' },
      { name: 'Zoológico de Cali', description: 'Uno de los mejores zoológicos de Latinoamérica.' },
    ],
  },
  {
    id: 'barranquilla',
    slug: 'barranquilla',
    name: 'Barranquilla',
    summary: 'Ciudad caribeña famosa por su Carnaval y su alegría.',
    images: ['/IMG/BARRANQUILLA.png'],
    tags: ['Cultura', 'Carnaval', 'Tradición'],
    duration: '2-4 días',
    rating: 4.6,
    coords: { lat: 10.9639, lng: -74.7964 },
    description:
      'Barranquilla vibra con música, arte y hospitalidad. Su Carnaval, declarado Patrimonio Inmaterial de la Humanidad, es una experiencia única.',
    bestSeason: 'Febrero (Carnaval)',
    pointsOfInterest: [
      { name: 'Museo del Caribe', description: 'Exposición sobre la cultura y diversidad del Caribe colombiano.' },
      { name: 'Bocas de Ceniza', description: 'Encuentro del río Magdalena con el mar Caribe.' },
      { name: 'Gran Malecón', description: 'Espacio moderno a orillas del río Magdalena.' },
    ],
  },
  {
    id: 'sanandres',
    slug: 'sanandres',
    name: 'San Andrés',
    summary: 'Isla paradisíaca con el mar de siete colores y arrecifes coralinos.',
    images: ['/IMG/SAN_ANDRES.png'],
    tags: ['Playa', 'Isla', 'Buceo'],
    duration: '3-5 días',
    rating: 4.8,
    coords: { lat: 12.5847, lng: -81.7006 },
    description:
      'San Andrés es un destino caribeño soñado. Sus playas de arena blanca, su mar turquesa y su ambiente isleño la hacen inolvidable.',
    bestSeason: 'Diciembre a mayo',
    pointsOfInterest: [
      { name: 'Johnny Cay', description: 'Islote paradisíaco con palmeras y playas perfectas.' },
      { name: 'La Piscinita', description: 'Lugar ideal para nadar y bucear con peces tropicales.' },
      { name: 'Hoyo Soplador', description: 'Fenómeno natural que lanza chorros de agua desde las rocas.' },
    ],
  },
  {
    id: 'villadeleyva',
    slug: 'villadeleyva',
    name: 'Villa de Leyva',
    summary: 'Pueblo colonial con calles empedradas y arquitectura intacta.',
    images: ['/IMG/VILLA_LEYVA.png'],
    tags: ['Historia', 'Arquitectura', 'Patrimonio'],
    duration: '2 días',
    rating: 4.9,
    coords: { lat: 5.634, lng: -73.524 },
    description:
      'Villa de Leyva conserva su encanto colonial con calles empedradas, fachadas blancas y plazas amplias. Es un destino perfecto para desconectarse.',
    bestSeason: 'Julio a septiembre',
    pointsOfInterest: [
      { name: 'Plaza Mayor', description: 'Una de las plazas más grandes de América Latina.' },
      { name: 'Museo Paleontológico', description: 'Exhibiciones fósiles y restos prehistóricos.' },
      { name: 'Pozos Azules', description: 'Lagunas artificiales de color turquesa.' },
    ],
  },
  {
    id: 'leticia',
    slug: 'leticia',
    name: 'Leticia',
    summary: 'Puerta de entrada al Amazonas colombiano, ideal para ecoturismo.',
    images: ['/IMG/LETICIA.png'],
    tags: ['Naturaleza', 'Aventura', 'Amazonas'],
    duration: '3-5 días',
    rating: 4.7,
    coords: { lat: -4.215, lng: -69.9406 },
    description:
      'Leticia es el corazón de la Amazonía colombiana. Sus selvas, ríos y biodiversidad ofrecen experiencias únicas de conexión con la naturaleza.',
    bestSeason: 'Junio a septiembre',
    pointsOfInterest: [
      { name: 'Isla de los Micos', description: 'Santuario natural donde habitan cientos de monos.' },
      { name: 'Parque Nacional Amacayacu', description: 'Reserva natural con flora y fauna exótica.' },
      { name: 'Malecón de Leticia', description: 'Vista al río Amazonas y sus atardeceres.' },
    ],
  },
  {
    id: 'popayan',
    slug: 'popayan',
    name: 'Popayán',
    summary: 'Ciudad blanca, rica en historia, cultura y gastronomía.',
    images: ['/IMG/POPAYAN.png'],
    tags: ['Historia', 'Religión', 'Cultura'],
    duration: '2-3 días',
    rating: 4.8,
    coords: { lat: 2.438, lng: -76.613 },
    description:
      'Popayán es una joya colonial en el suroccidente de Colombia. Sus procesiones de Semana Santa son Patrimonio de la Humanidad y su cocina es reconocida en todo el país.',
    bestSeason: 'Semana Santa',
    pointsOfInterest: [
      { name: 'Puente del Humilladero', description: 'Icónico puente colonial de piedra.' },
      { name: 'Parque Caldas', description: 'Centro histórico de la ciudad blanca.' },
      { name: 'Museo de Arte Religioso', description: 'Colección de piezas coloniales y religiosas.' },
    ],
  },


  {
    id: 'guatape',
    slug: 'guatape',
    name: 'Guatapé',
    summary: 'Pueblo colorido con calles empedradas, murales vibrantes y el famoso Peñón de Guatapé.',
    images: ['/IMG/GUATAPE.png'],
    tags: ['Naturaleza', 'Arquitectura', 'Aventura'],
    duration: '1-2 días',
    rating: 4.8,
    coords: { lat: 6.232, lng: -75.163 },
    description: 'Guatapé, en el oriente antioqueño, es conocido por sus coloridos zócalos y el icónico Peñón de Guatapé, una roca gigante con una vista panorámica del embalse. Es un destino ideal para escapadas cortas desde Medellín.',
    bestSeason: 'Diciembre a marzo',
    pointsOfInterest: [
      { name: 'Peñón de Guatapé', description: 'Una roca gigante de 220 metros con vista al embalse.' },
      { name: 'Malecón de Guatapé', description: 'Zona ideal para caminar, comer y disfrutar del lago.' },
      { name: 'Calle de los Zócalos', description: 'Calles decoradas con coloridos relieves tradicionales.' }
    ]
  },
  {
    id: 'salento',
    slug: 'salento',
    name: 'Salento',
    summary: 'Pueblo cafetero con arquitectura tradicional y acceso al Valle de Cocora.',
    images: ['/IMG/SALENTO.png'],
    tags: ['Naturaleza', 'Café', 'Cultura'],
    duration: '2-3 días',
    rating: 4.9,
    coords: { lat: 4.637, lng: -75.570 },
    description: 'Salento es una joya del Eje Cafetero, rodeado de paisajes verdes, cafetales y el impresionante Valle de Cocora, hogar de las palmas de cera más altas del mundo.',
    bestSeason: 'Diciembre a marzo',
    pointsOfInterest: [
      { name: 'Valle de Cocora', description: 'Paisaje emblemático con palmas de cera gigantes.' },
      { name: 'Mirador de Salento', description: 'Vista panorámica del pueblo y montañas.' },
      { name: 'Calle Real', description: 'Calle principal con tiendas artesanales y cafeterías.' }
    ]
  },
  {
    id: 'mompox',
    slug: 'mompox',
    name: 'Santa Cruz de Mompox',
    summary: 'Ciudad colonial a orillas del río Magdalena, Patrimonio de la Humanidad.',
    images: ['/IMG/MOMPOX.png'],
    tags: ['Historia', 'Cultura', 'Arquitectura'],
    duration: '2-3 días',
    rating: 4.7,
    coords: { lat: 9.240, lng: -74.426 },
    description: 'Mompox conserva su encanto colonial intacto, con calles empedradas y casas blancas a orillas del río. Es un viaje al pasado lleno de historia y tranquilidad.',
    bestSeason: 'Diciembre a marzo',
    pointsOfInterest: [
      { name: 'Iglesia de Santa Bárbara', description: 'Templo colonial con decoración barroca.' },
      { name: 'Malecón del Río Magdalena', description: 'Paseo frente al río con vistas espectaculares.' },
      { name: 'Cementerio de Mompox', description: 'Espacio lleno de historia y arquitectura funeraria.' }
    ]
  },
  {
    id: 'palomino',
    slug: 'palomino',
    name: 'Palomino',
    summary: 'Destino costero en La Guajira, famoso por sus playas y río navegable en flotadores.',
    images: ['/IMG/PALOMINO.png'],
    tags: ['Playa', 'Aventura', 'Naturaleza'],
    duration: '2-3 días',
    rating: 4.6,
    coords: { lat: 11.255, lng: -73.569 },
    description: 'Palomino combina mar, selva y río en un solo lugar. Es un destino ideal para mochileros, surfistas y viajeros que buscan desconexión y naturaleza.',
    bestSeason: 'Diciembre a mayo',
    pointsOfInterest: [
      { name: 'Río Palomino', description: 'Recorrido en neumático hasta el mar.' },
      { name: 'Playa Palomino', description: 'Amplia playa con vista a la Sierra Nevada.' },
      { name: 'Sierra Nevada', description: 'Fondo montañoso impresionante junto al mar.' }
    ]
  },
  {
    id: 'tayrona',
    slug: 'tayrona',
    name: 'Parque Nacional Tayrona',
    summary: 'Uno de los parques naturales más bellos del país, con playas vírgenes y selva tropical.',
    images: ['/IMG/TAYRONA.png'],
    tags: ['Naturaleza', 'Playa', 'Aventura'],
    duration: '2-4 días',
    rating: 4.9,
    coords: { lat: 11.3, lng: -74.033 },
    description: 'El Parque Tayrona es un paraíso de biodiversidad con playas cristalinas, senderos naturales y una profunda conexión espiritual con los pueblos indígenas de la Sierra Nevada.',
    bestSeason: 'Diciembre a abril',
    pointsOfInterest: [
      { name: 'Cabo San Juan', description: 'La playa más icónica del parque.' },
      { name: 'Bahía Concha', description: 'Playa tranquila cerca de Santa Marta.' },
      { name: 'Pueblito Chairama', description: 'Ruinas arqueológicas en medio de la selva.' }
    ]
  },
  {
    id: 'capurgana',
    slug: 'capurgana',
    name: 'Capurganá',
    summary: 'Destino del Chocó con playas paradisíacas y selva tropical, cerca de Panamá.',
    images: ['/IMG/CAPURGANA.png'],
    tags: ['Playa', 'Naturaleza', 'Aventura'],
    duration: '3-4 días',
    rating: 4.7,
    coords: { lat: 8.625, lng: -77.355 },
    description: 'Capurganá es un destino de ecoturismo ideal para los amantes del mar y la selva. Solo se puede llegar por mar o aire, lo que conserva su encanto natural.',
    bestSeason: 'Diciembre a abril',
    pointsOfInterest: [
      { name: 'Playa Soledad', description: 'Una de las más hermosas del Caribe colombiano.' },
      { name: 'El Cielo', description: 'Cascadas y pozas naturales en la selva.' },
      { name: 'Sapzurro', description: 'Pueblo vecino con aguas cristalinas y paso a Panamá.' }
    ]
  }

  

];


export default allcities;
