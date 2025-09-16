require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, // 'db' คือชื่อ service ใน docker-compose
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT "Connection to DB successful!" as message');
    res.json({
      message: 'Hello from Backend!',
      db_message: rows[0].message
    });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});