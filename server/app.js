import express from 'express';
import router from './routes/index';

const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 6000;

const server = app.listen(port, () => {
  console.log('server running on port 6000');
  return server;
});


export default app;
