const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuario'); // tu ruta de registro
const authRoutes = require('./routes/auth');       // ruta de login

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares (asegúrate que estén antes de las rutas)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuarioRoutes); // tu registro
app.use('/api/auth', authRoutes);        // login

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
