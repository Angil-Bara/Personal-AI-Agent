# Setup Instructions for Jarvis

## Overview
This document provides detailed instructions on how to set up the Personal AI Agent (Jarvis) project locally.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **PostgreSQL** (for database management)

## Installation Steps
1. **Clone the Repository**  
   Use the following command to clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-ai-agent.git
   cd personal-ai-agent
   ```

2. **Install Dependencies**  
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory of the project and add the following variables:
   ```plaintext
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PORT=5432
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Set Up the Database**  
   Ensure PostgreSQL is running, and create the necessary tables by executing the SQL script located at `src/schema.sql`:
   ```bash
   psql -U your_db_user -d your_db_name -f src/schema.sql
   ```

5. **Start the Application**  
   You can start the application using the following command:
   ```bash
   npm start
   ```
   The application will be running at `http://localhost:3000`.

## Configuration Settings
- Ensure that your email configuration is set up correctly in the application to enable email processing.
- Configure the Google Calendar API credentials in the `.env` file as mentioned above.

## Conclusion
Following these steps will help you set up the Jarvis project locally for development and testing.