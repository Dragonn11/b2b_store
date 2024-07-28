const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'b2b_store.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database..');
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table', err.message);
        } else {
          console.log('Users table created.');
        }
      }
    );
    // Create the products table
    db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      data_category TEXT NOT NULL,
      record_count INTEGER NOT NULL,
      company_name TEXT,
      company_address TEXT,
      website TEXT
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      } else {
        console.log('Products table created.');
      }
    }
  );


  }
});

module.exports = db;
