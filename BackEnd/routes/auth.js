const express = require('express');
const router = express.Router();

// Ruta de prueba de autenticación
router.get('/', (req, res) => {
  res.json({ message: '✅ Rutas de autenticación funcionando' });
});

module.exports = router;
