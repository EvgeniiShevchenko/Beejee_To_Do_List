"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongodbStitchServerSdk = require("mongodb-stitch-server-sdk");

var _keys = _interopRequireDefault(require("../../config/keys"));

var router = _express["default"].Router();

var client = _mongodbStitchServerSdk.Stitch.defaultAppClient;
var mongodb = client.getServiceClient(_mongodbStitchServerSdk.RemoteMongoClient.factory, "mongodb-atlas").db("firstApp");
var db = mongodb.collection("Autorisation");
router.post("/autorisation",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var login, password, get_data_from_database, payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            login = req.body.login;
            password = req.body.password;
            _context.next = 4;
            return db.find({
              "Login": login
            }).asArray();

          case 4:
            get_data_from_database = _context.sent;

            if (!(Object.keys(get_data_from_database).length === 0)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              "error": "email not found"
            }));

          case 7:
            ;

            if (!(get_data_from_database[0].Password === password)) {
              _context.next = 13;
              break;
            }

            payload = {
              role: get_data_from_database[0].Login
            };

            _jsonwebtoken["default"].sign(payload, _keys["default"].secretOrKey, {
              expiresIn: 3600
            }, function (err, token) {
              db.updateOne({
                Password: password
              }, {
                $set: {
                  token: token
                }
              });
              res.json({
                success: true,
                token: 'Bearer  ' + token
              });
            });

            _context.next = 14;
            break;

          case 13:
            return _context.abrupt("return", res.status(404).json({
              "errors": "Error password is incorrect"
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;