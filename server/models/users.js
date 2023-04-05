const { Pool } = require('pg');

// const pool = new Pool({
//     host: "34.68.249.54",
//     database: "users",
//     user: "postgres",
//     password: "testing",
//     //port: 5432
// });

const pool = new Pool({
  host: "35.239.173.2",
  database: "postgres",
  user: "postgres",
  password: "postgress",
  //port: 5432
});


pool.connect();

pool.query('SELECT * FROM users')
  .then(res => console.log(res.rows))
  .catch(err => console.error(err));

async function createTable() {
    const client = await pool.connect();
    try {

      await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
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
        return result;
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
  
    static async create(fname, lname, email, username, password) {
      //console.log(user);
      const client = await pool.connect();
      try {
        const result = await client.query(
          `INSERT INTO users(first_name, last_name, username, email, password) VALUES ('${fname}', '${lname}', '${email}', '${username}', '${password}');`
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }

    static async login(username, password) {
      //console.log(user);
      const client = await pool.connect();
      try {
        const result = await client.query(
          `select id from users where username='${username}' and password='${password}';`
        );
        return result.rows[0];
        } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  
    // static async update(id, user) {
    //   const client = await pool.connect();
    //   try {
    //     const result = await client.query(
    //       'UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4, password = $5 WHERE id = $6 RETURNING *',
    //       [user.first_name, user.last_name, user.username, user.email, user.password, id]
    //     );
    //     return result.rows[0];
    //     } catch (err) {
    //     console.error(err);
    //   } finally {
    //     client.release();
    //   }
    // }

    static async update(id, user) {
      const client = await pool.connect();
      try {
        const fields = [];
        const values = [];
        let index = 1;
        for (const key in user) {
          if (user[key] !== undefined) {
            fields.push(`${key} = $${index}`);
            values.push(user[key]);
            index++;
          }
        }
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
        const result = await client.query(query, [...values, id]);
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