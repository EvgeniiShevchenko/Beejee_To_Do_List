"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _ensureAuthorized = _interopRequireDefault(require("./validations/ensureAuthorized"));

var task = require('./routes/api/task');

var login = require('./routes/api/login');

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_ensureAuthorized["default"]); // Промежуточная функция проверки уровня доступа

app.use("/api/task", task);
app.use("/api/login", login);

if (process.env.NODE_ENV === 'production') {
  app.use(_express["default"]["static"](_path["default"].join(__dirname, "client", "build")));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server start on ".concat(port, " port!"));
});