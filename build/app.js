

Object.defineProperty(exports, "__esModule", {
  value: true,
});

let _express = require('express');

let _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let bodyParser = require('body-parser');

let app = (0, _express2.default)();
let router = require('../routes/index.js');

app.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
app.use(router);

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server running on port ' + port);
});

exports.default = app;
