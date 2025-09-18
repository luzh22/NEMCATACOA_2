const express = require('express');
const router = express.Router();

// Obtener todas las reservas
router.get('/', (req, res) => {
  res.json({ message: '✅ Lista de reservas funcionando' });
});

module.exports = router;
