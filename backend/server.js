const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "mydb"
});

app.use(cors({
  origin: ["http://localhost:8080"]
}));

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

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

