import db from '../../db/index';

const tables = ['red-flags', 'interventions', 'users'];

const createtable = () => {
  const text = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY), 
    firstName varchar(255), 
    lastName varchar(255), 
    email varchar(255), 
    password varchar(255));
    `;
  return text;
};

async function createUserTable() {
  try {
    await db.query(createtable);
  } catch (error) {
    console.log(error);
  }
}

createUserTable();

require('make-runnable');
