const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Registro de usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, usuario, email, password, fechaNacimiento, ubicacion } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        usuario,
        email,
        password: hashedPassword,
        fechaNacimiento: new Date(fechaNacimiento),
        ubicacion
      }
    });

    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear el usuario', details: error.message });
  }
});

module.exports = router;
