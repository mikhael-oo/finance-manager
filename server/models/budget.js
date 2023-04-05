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

pool.query('SELECT * FROM budget')
.then(res => console.log(res.rows))
.catch(err => console.error(err));

async function createTable() {
    const client = await pool.connect();
    try {
    await client.query(`
    CREATE TABLE IF NOT EXISTS budget (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        housing DECIMAL(10,2) NOT NULL,
        utilities DECIMAL(10,2) NOT NULL,
        transportation DECIMAL(10,2) NOT NULL,
        food DECIMAL(10,2) NOT NULL,
        entertainment DECIMAL(10,2) NOT NULL,
        saving DECIMAL(10,2) NOT NULL,
        miscellaneous DECIMAL(10,2) NOT NULL,
        date BIGINT NOT NULL,
        month INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    `);
    console.log('Budget table created successfully');
    } catch (error) {
    console.error('Error creating users table:', error);
    } finally {
    await client.end();
    }
}

class Budget {
    static async create(user_id, housing, utilities, transportation, food, entertainment, saving, miscellaneous, date, month) {
    const client = await pool.connect();
    try {
        const result = await client.query(`
        INSERT INTO budget (user_id, housing, utilities, transportation, food, entertainment, saving, miscellaneous, date, month)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        `, [user_id, housing, utilities, transportation, food, entertainment, saving, miscellaneous, date, month]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating budget:', err);
    } finally {
        client.release();
    }
    }

    //METHOD TO GET A SPECIFIC USERS BUDGET
    static async getByUser(user_id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM budget WHERE user_id = $1', [user_id]);
        return result.rows;
    } catch (err) {
        console.error('Error getting budget by user:', err);
    } finally {
        client.release();
    }
    }

    //METHOD TO UPDATE PARTS OF A USERS BUDGET
    // static async update(user_id, month, updates) {
    //     const client = await pool.connect();
    //     try {
    //     let query = 'UPDATE budget SET';
    //     const values = [user_id];
    
    //     const keys = Object.keys(updates);
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         query += ` ${key} = $${i + 2}`;
    //         values.push(updates[key]);
    //         if (i < keys.length - 1) {
    //         query += ',';
    //         }
    //     }
    
    //     query += ' WHERE user_id = $1 RETURNING *';
    
    //     const result = await client.query(query, values);
    //     return result.rows;
    //     } catch (err) {
    //     console.error('Error updating budget:', err);
    //     } finally {
    //     client.release();
    //     }
    // }



    static async update(user_id, month, amount, attribute) {
        const client = await pool.connect();
        try {
        let query = 'UPDATE budget SET ' + attribute + ' = ' + amount + ' WHERE user_id = $1 AND month = $2 RETURNING *';
        console.log(query);
        const values = [user_id, month];
        const result = await client.query(query, values);
        return result.rows;
        } catch (err) {
        console.error('Error updating budget:', err);
        } finally {
        client.release();
        }
    }









    // static async update(user_id, month, updates) {
    //     const client = await pool.connect();
    //     try {
    //     let query = 'UPDATE budget SET';
    //     const values = [user_id, month];
    
    //     const keys = Object.keys(updates);
    //     let counter = 3;
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         if (updates[key]) { // only update if the form field is filled out
    //         query += ` ${key} = $${counter},`;
    //         values.push(updates[key]);
    //         counter++;
    //         }
    //     }
    //       query = query.slice(0, -1); // remove trailing comma
    
    //       query += ' WHERE user_id = $1 AND month = $2 RETURNING *';
    
    //     const result = await client.query(query, values);
    //     return result.rows;
    //     } catch (err) {
    //     console.error('Error updating budget:', err);
    //     } finally {
    //     client.release();
    //     }
    // }

}

module.exports = {Budget, createTable};
