"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bodyParser = require('body-parser');

const app = (0, _express.default)();

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(_index.default);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('server running on port 4000');
  return server;
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map