"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bson = require("bson");

var _mongodbStitchServerSdk = require("mongodb-stitch-server-sdk");

var axios = require('axios');

var express = require('express');

var router = express.Router();
var appId = "app-gzhil";

var client = _mongodbStitchServerSdk.Stitch.initializeDefaultAppClient(appId);

var mongodb = client.getServiceClient(_mongodbStitchServerSdk.RemoteMongoClient.factory, "mongodb-atlas");
var db = mongodb.db("firstApp");
var collection = db.collection("Task");
client.auth.loginWithCredential(new _mongodbStitchServerSdk.AnonymousCredential()).then(function (user) {
  console.log("logged in anonymously as user ".concat(user.id));
}); // @route   host: api/task/

router.get("/",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var get_data_from_database;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return collection.find({}, {
              sort: {
                _id: -1
              },
              limit: 7
            }).asArray();

          case 3:
            get_data_from_database = _context.sent;
            res.send(get_data_from_database);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(404).json({
              "errors": _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // @route   host: api/task/count

router.get("/count",
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var get_data_count_from_database;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return collection.count();

          case 3:
            get_data_count_from_database = _context2.sent;
            res.send(String(get_data_count_from_database));
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(404).json({
              "errors": _context2.t0
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // @route   host: api/task/add-task

router.post("/add-task",
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var newtask, send_data_to_database;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            newtask = req.body;
            _context3.next = 4;
            return collection.insertOne(newtask);

          case 4:
            send_data_to_database = _context3.sent;
            res.send(send_data_to_database);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(404).json({
              "errors": _context3.t0
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // @route   host: api/task/delete/:id

router["delete"]("/delete/:id",
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var id, token, verify_user, delete_task_from_database;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = new _bson.ObjectId(req.params.id);
            token = req.token;
            _context4.next = 5;
            return db.collection("Autorisation").find({
              token: token
            }).asArray();

          case 5:
            verify_user = _context4.sent;

            if (Object.keys(verify_user).length === 0) {
              _context4.next = 13;
              break;
            }

            _context4.next = 9;
            return collection.deleteOne({
              _id: d
            });

          case 9:
            delete_task_from_database = _context4.sent;
            res.send({
              "Error": "Task was daleted"
            });
            _context4.next = 14;
            break;

          case 13:
            res.send({
              "Error": "Task wasn't daleted"
            });

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](0);
            res.send({
              "errors": _context4.t0
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 16]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // +++++++++++++++++++++++++++++++++++++++ Pagination and filter ++++++++++++++++++++++++++++++++
// @route   host: api/task/pagination

router.post("/pagination",
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var newtask, ckipe, pipeline, get_data_from_database;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            newtask = req.body;
            ckipe = newtask.limit * (newtask.page - 1);
            pipeline = [newtask.limit, ckipe, newtask.filter];
            _context5.prev = 3;
            _context5.next = 6;
            return client.callFunction("Pagination", pipeline);

          case 6:
            get_data_from_database = _context5.sent;
            res.send(get_data_from_database);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](3);
            res.send({
              "errors": _context5.t0
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // @route   host: api/task/param_id/status_name

router.put("/status/:id/:status",
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var id, new_status, token, verify_user, delete_task_from_database;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = new _bson.ObjectId(req.params.id);
            new_status = req.params.status;
            token = req.token;
            _context6.next = 6;
            return db.collection("Autorisation").find({
              token: token
            }).asArray();

          case 6:
            verify_user = _context6.sent;

            if (Object.keys(verify_user).length === 0) {
              _context6.next = 14;
              break;
            }

            _context6.next = 10;
            return collection.findOneAndUpdate({
              _id: id
            }, {
              $set: {
                Status: new_status
              }
            });

          case 10:
            delete_task_from_database = _context6.sent;
            res.send({
              "Sucsses": "Status was updated"
            });
            _context6.next = 15;
            break;

          case 14:
            res.send({
              "Error": "Status wasn't updated"
            });

          case 15:
            _context6.next = 20;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](0);
            res.send({
              "Error": _context6.t0
            });

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 17]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); // @route   host: api/task/update/param_id

router.put("/update/:id",
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var id, token, new_task, verify_user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = new _bson.ObjectId(req.params.id);
            token = req.token;
            new_task = req.body;
            _context7.next = 6;
            return db.collection("Autorisation").find({
              token: token
            }).asArray();

          case 6:
            verify_user = _context7.sent;

            if (Object.keys(verify_user).length === 0) {
              _context7.next = 13;
              break;
            }

            _context7.next = 10;
            return collection.findOneAndUpdate({
              _id: id
            }, {
              $set: (0, _objectSpread2["default"])({}, new_task)
            });

          case 10:
            res.send({
              "Sucsses": "Task was updated"
            });
            _context7.next = 14;
            break;

          case 13:
            res.send({
              "Error": "Task wasn't updated"
            });

          case 14:
            _context7.next = 19;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            res.send({
              "Error": _context7.t0
            });

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 16]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); // @route   host: api/task/param_request

router.get("/search/:request",
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var search_request, url, result, jsonText;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            search_request = req.params.request;
            url = encodeURI("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app-gzhil/service/http/incoming_webhook/search_request?arg1=".concat(search_request));
            _context8.prev = 2;
            _context8.next = 5;
            return axios.get(url);

          case 5:
            result = _context8.sent;
            jsonText = JSON.stringify(result.data);
            res.send(jsonText);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](2);
            res.send("\"Error\": ".concat(_context8.t0));

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 10]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
module.exports = router;