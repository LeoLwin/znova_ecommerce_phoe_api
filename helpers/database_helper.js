require("dotenv").config();
const mysql = require("mysql2/promise");


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connection successful!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error(" MySQL connection failed:", error.message);
  }
})();

module.exports = pool;
