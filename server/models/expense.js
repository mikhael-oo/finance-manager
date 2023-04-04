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
        category VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date BIGINT NOT NULL,
        month INTEGER NOT NULL,
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
        const result = await client.query(`SELECT * FROM expenses`);
        return result;
      } catch (err) {
        console.error("Getting everything from expenses table threw this error "+ err);
      } finally {
        client.release();
      }
    }

    static async getbyId(uid) {
      const client = await pool.connect();
      try {
        const result = await client.query(`SELECT title, category, amount, date, month FROM expenses where user_id='${uid}'`);
        return result;
      } catch (err) {
        console.error("Getting by id from expenses table threw this error "+ err);
      } finally {
        client.release();
      }
    }
  
    static async create(uid, expenseName, amount, category, date, month) {
      //console.log(user);
      const client = await pool.connect();
      try {
        const result = await client.query(
          `INSERT INTO expenses(user_id, title, category, amount, date, month) VALUES ( '${uid}','${expenseName}', '${category}', '${amount}', '${date}', '${month}');`
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }


    static async delete(uid,id){
      const client = await pool.connect();
      try {
        const result = await client.query(`DELETE FROM expenses WHERE user_id='${uid}' AND id='${id}';`);
        return result;
      }
      catch (err){
        console.log(err);
      }
      finally {
        client.release();
      }
    }

  }
  
  module.exports = {Expense, createTable};