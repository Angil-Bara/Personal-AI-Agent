// src/database.js

//Import the necessary library for darabase connection, using pg library for PostgreSQL
const {Pool} = require('pg');

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

//Export the queryDatabase function and pool instance for use in other modules
module.exports ={
    queryDatabase,
    pool
};