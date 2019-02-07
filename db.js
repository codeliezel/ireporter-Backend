const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
});

// create users table

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        otherNames VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        phoneNumber VARCHAR(50),
        userName VARCHAR(20),
        registered TIMESTAMP,
        isAdmin BOOLEAN DEFAULT false,
        password VARCHAR(128) NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log("Users table has been created!");
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// create incidents table

const createIncidentsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP,
        createdBy TEXT NOT NULL,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        status VARCHAR(50),
        title TEXT NOT NULL,
        comment TEXT NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log("Incidents table has been created!");
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Drop Users Table

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log("Users table has been dropped!");
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// Drop incidents table

const dropIncidentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incidents';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log("Incidents table has been dropped!");
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


module.exports = {
  createUsersTable,
  dropUsersTable,
  createIncidentsTable,
  dropIncidentsTable,

// node db
};

require('make-runnable');
