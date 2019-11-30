const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE_URL,
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
        phoneNumber VARCHAR(50) UNIQUE NOT NULL,
        userName VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        isActive BOOLEAN DEFAULT true,
        createdOn TIMESTAMP,
        updatedOn TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createIncidentsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        userId INTEGER REFERENCES users(id),
        createdBy VARCHAR REFERENCES Users(userName),
        type VARCHAR(30),
        location TEXT NOT NULL,
        status VARCHAR(30) DEFAULT 'in-review',
        title TEXT NOT NULL,
        comment TEXT NOT NULL,
        createdOn TIMESTAMP,
        updatedOn TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Incidents table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


// Drop Users Table

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been dropped!');
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
      console.log('Incidents table has been dropped!');
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
