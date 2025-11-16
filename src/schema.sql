-- src/schema.sql
-- SQL schema for Personal AI Agent application

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE, -- Username must be unique
    email VARCHAR(100) NOT NULL UNIQUE, -- Email must be unique
    password VARCHAR(255) NOT NULL, -- Hashed password
);

-- SQL script to crate the Emails table
CREATE TABLE emails (
    id SERIAL PRIMARY KEY, -- Unique identifier for each email
    user_id INT NOT NULL, -- Foreign key to the users table
    subject VARCHAR(255) NOT NULL, -- Subject of the email
    body TEXT NOT NULL, -- Body content of the email
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the email was created
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Establish relationship with Users table
);

-- 