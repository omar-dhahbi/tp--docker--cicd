const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config(); // Pour lire les variables d'environnement depuis .env

const app = express();
const PORT = process.env.PORT || 3000;

// Config PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*" // Frontend URL
}));
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    success: true
  });
});

app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({
      message: "Data from Database",
      data: result.rows,
      success: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
