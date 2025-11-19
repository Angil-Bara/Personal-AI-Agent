// src/database.js

//Import the necessary library for darabase connection, using pg library for PostgreSQL
const {Pool} = require('pg');
const {encrypt, decrypt} = require('./security')

//Create a new pool instance to manage database connections
const pool = new Pool({
    user: process.env.DB_USER, //Database user from environment variables
    host: process.env.DB_HOST, //Database host from environment variables
    database: process.env.DB_NAME, //Database name from environment variables
    password: process.env.DB_PASSWORD, //Database password from environment variables
    port: process.env.DB_PORT || 5432, //Database port from environment variables or default to 5432
});

//Function to query the database
async function queryDatabase(){
    try{
        await pool.connect(); //Establish a connection to the database
        
        console.log('Database connected successfully'); // Log success message

        // Create subscription table if it doesn't exist
        await pool.query('CREAT TABLE IF NOT EXISTS subscriptions(\n' +
            'id SERIAL PRIMARY KEY,\n' +
            'user_id INTEGER NOT NULL,\n' +
            'status VANCHAR(50) NOT NULL,\n' +
            'next_payment_date DATE NOT NULL,\n' +
            'FORIEGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\m);');
    }catch(error){
        console.error('Database connection error:', error); //Log any connection errors
        process.exit(1); //Exit the process with failure code
    }
};

/**
 * Function to save use data securely to the datavase.
 * @param {Object} user - The user object containing sensitive data.
 * @returns {Promise<void>} - A promise that resolves when tthe data is saved.
 */
const saveUser = async (user) => {
    const encryptedEmail = encrypt(user.email);
    const query = 'INSTERT INTO Users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [user.username, encryptedEmail, user.password]);
};

/**
 * Function to retrieve user data from the datavaase and decrypt it.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<Object>} - The user object with decrypted data.
 */
const getUser = async (username) => {
    const query = 'SELECT * FROM Users WHERE  username = $1';
    const result = await pool.query(query, [user.username]);
    if(result.rows.lenth === 0){
        throw new Error('User not found');
    }
    const user = result.rows[0];
    user.email = decrypt(user.email);
    return user;
};

//Export the queryDatabase function and pool instance for use in other modules
module.exports ={
    queryDatabase,
    pool,
    saveUser,
    getUser
};