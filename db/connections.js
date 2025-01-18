const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    password: 'process.env.DB_PASSWORD',
    database: process.env.DB_NAME
});

client.connect()
    .then(() => console.log('Connected to the database.'))
    .catch(err => console.error('Error connecting to database:', err));

module.exports = client;