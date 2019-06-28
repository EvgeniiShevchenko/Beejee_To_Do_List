import express from "express";
import jwt from "jsonwebtoken";
import {Stitch, RemoteMongoClient} from "mongodb-stitch-server-sdk";
import key from'../../config/keys';
const router = express.Router();

const client = Stitch.defaultAppClient;
const mongodb = client.getServiceClient(RemoteMongoClient.factory,"mongodb-atlas").db("firstApp");
const db = mongodb.collection("Autorisation");



  router.post("/autorisation", async (req, res) => {

    const login = req.body.login;
    const password = req.body.password;

    const get_data_from_database = await db.find({"Login": login}).asArray();
    if (Object.keys(get_data_from_database).length === 0) {
      return res.status(404).json({
        "error": "email not found"
      });
    };
    if (get_data_from_database[0].Password === password) {
      const payload = {role: get_data_from_database[0].Login};
      jwt.sign(
        payload,
        key.secretOrKey, {
          expiresIn: 3600
        },
        (err, token) => {
          db.updateOne({
            Password: password
          }, {
            $set: {
              token: token
            }
          });
          res.json({
            success: true,
            token: 'Bearer  ' + token,
          });
        }
      );
    } else {
      return res.status(404).json({
        "errors": "Error password is incorrect"
      });
    }
  });

module.exports = router
