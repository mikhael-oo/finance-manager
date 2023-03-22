const { Pool } = require('pg');

const pool = new Pool({
    host: "34.68.249.54",
    database: "postgres",
    user: "postgres",
    password: "testing",
    port: 8080
});

async function createTable() {
    const client = await pool.connect();
    try {
     
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `);
      console.log('Users table created successfully');
    } catch (error) {
      console.error('Error creating users table:', error);
    } finally {
      await client.end();
    }
  }

class User {
    static async getAll() {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
      } catch (err) {
        console.error("Getting everything from user table threw this error "+ err);
      } finally {
        client.release();
      }
    }
  
    static async getById(id) {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  
    static async create(user) {
      const client = await pool.connect();
      try {
        const result = await client.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [user.name, user.email, user.password]
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  
    static async update(id, user) {
      const client = await pool.connect();
      try {
        const result = await client.query(
          'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
          [user.name, user.email, user.password, id]
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  
    static async delete(id) {
      const client = await pool.connect();
      try {
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  }
  
  module.exports = {User, createTable};