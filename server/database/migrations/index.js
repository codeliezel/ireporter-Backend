import db from "./db/index";

const tables = ['redflags', 'interventions', 'users'];

db.query(
  `CREATE TABLE users(id SERIAL PRIMARY KEY), 
     firstName varchar(255), 
     lastName varchar(255), 
     Email varchar(255), 
     Password varchar(255));
     `,
);
