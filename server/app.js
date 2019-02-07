import express from 'express';

import router from './routes/index';

import 'babel-polyfill';


const bodyParser = require('body-parser');

const app = express();

// to load up env file that includes values for environment varibales
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// app.get('/api/v1/users', users.getAll);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running on port 4000`);
});

export default app;
