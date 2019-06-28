"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var path = require('path');

var express = require("express");

var task = require('./routes/api/task');

var login = require('./routes/api/login');

function ensureAuthorized(req, res, next) {
  if (!req.headers["authorization"]) {
    next();
  } else {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[2];
      req.token = bearerToken;
      next();
    }
  }
}

;
var app = express();
app.use((0, _morgan["default"])('dev'));
app.use(ensureAuthorized);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use("/api/task", task);
app.use("/api/login", login);

if (process.env.NODE_ENV === 'production') {
  app.use(express["static"](path.join(__dirname, "client", "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server start on ".concat(port, " port!"));
});
