-- src/schema.sql
-- SQL schema for Personal AI Agent application

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE, -- Username must be unique
    email VARCHAR(100) NOT NULL UNIQUE, -- Email must be unique
    password VARCHAR(255) NOT NULL, -- Hashed password
);

-- SQL script to crate the Emails table