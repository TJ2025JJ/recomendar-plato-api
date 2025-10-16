// importar dependencias
import express from "express";
import pkg from "pg";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 8080;

// permitir JSON
app.use(bodyParser.json());

// conectar a la base de datos usando DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario para Render
  },
});

// Ruta principal para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("✅ API del Recomendador de Platos funcionando correctamente");
});

// Ejemplo de ruta para guardar una preferencia en la base de datos
app.post("/guardar", async (req, res) => {
  const { nombre, preferencia } = req.body;

  try {
    const query = "INSERT INTO usuarios (nombre, preferencia) VALUES ($1, $2)";
    await pool.query(query, [nombre, preferencia]);
    res.json({ mensaje: "Datos guardados correctamente" });
  } catch (error) {
    console.error("Error al guardar:", error);
    res.status(500).json({ error: "Error al guardar en la base de datos" });
  }
});

// ejemplo de recomendación simple
app.post("/", (req, res) => {
  const { nombre, preferencia } = req.body;
  let recomendacion = "";

  if (preferencia.toLowerCase().includes("pollo")) {
    recomendacion = "Arroz chaufa de pollo";
  } else if (preferencia.toLowerCase().includes("cerdo")) {
    recomendacion = "Tallarines saltados con cerdo";
  } else {
    recomendacion = "Aeropuerto especial del chifa";
  }

  res.json({
    mensaje: `Hola ${nombre}, te recomendamos: ${recomendacion}`,
  });
});

// iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
