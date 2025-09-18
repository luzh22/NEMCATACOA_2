const express = require('express');
const router = express.Router();

// Obtener todos los lugares
router.get('/', (req, res) => {
  res.json({ message: '✅ Lista de lugares funcionando' });
});

module.exports = router;
