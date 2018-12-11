import dotenv from 'dotenv';

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({


  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

});

pool.on('connect', () => {
  console.log('connected to db');
});

export default {
  query(text, params, callback) {
    return pool.query(text, params, callback);
  },
};
