import express from 'express';
// eslint-disable-next-line import/no-cycle
import router from './routes/index';

import 'babel-polyfill';

const bodyParser = require('body-parser');
const ejs = require('ejs');

const socketio = require('socket.io');

const app = express();


// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


// to load up env file that includes values for environment varibales
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Index router

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log('server running on port 4000');
});


export default app;
