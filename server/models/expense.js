const { Pool } = require('pg');

const pool = new Pool({
    host: "34.68.249.54",
    database: "users",
    user: "postgres",
    password: "testing",
    //port: 5432
});

pool.connect();

pool.query('SELECT * FROM expenses')
  .then(res => console.log(res.rows))
  .catch(err => console.error(err));

async function createTable() {
    const client = await pool.connect();
    try {
     
      await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      `);
      console.log('Expense table created successfully');
    } catch (error) {
      console.error('Error creating users table:', error);
    } finally {
      await client.end();
    }
  }

  class Expense {
    static async getAll() {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM expenses');
        return result;
      } catch (err) {
        console.error("Getting everything from expenses table threw this error "+ err);
      } finally {
        client.release();
      }
    }
  
    static async create(expenseName, amount, description, category) {
      //console.log(user);
      const client = await pool.connect();
      try {
        const result = await client.query(
          `INSERT INTO expenses(user_id, title, description, category, amount, date) VALUES ( 1,'${expenseName}', '${description}','${category}', '${amount}', '2022-03-22');`
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }

  }
  
  module.exports = {Expense, createTable};