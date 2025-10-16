// index.js
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para interpretar JSON
app.use(express.json());

// Ruta GET para probar si el servidor funciona
app.get('/', (req, res) => {
  res.send('✅ API de recomendación de platos funcionando');
});

// Ruta POST para recomendar platos
app.post('/recomendar', (req, res) => {
  const { nombre, preferencia } = req.body;

  if (!nombre || !preferencia) {
    return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  let recomendacion;
  switch (preferencia.toLowerCase()) {
    case 'pollo':
      recomendacion = 'Chaufa de pollo 🍛';
      break;
    case 'carne':
      recomendacion = 'Aeropuerto especial 🥩';
      break;
    case 'pescado':
      recomendacion = 'Tallarín saltado con pescado 🐟';
      break;
    default:
      recomendacion = 'Arroz chaufa clásico 🍚';
  }

  res.json({
    mensaje: `Hola ${nombre}, te recomiendo: ${recomendacion}`
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
