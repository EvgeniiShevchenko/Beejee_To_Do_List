import { ObjectId } from 'bson';
import {Stitch, RemoteMongoClient, AnonymousCredential} from "mongodb-stitch-server-sdk";
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Иницилизация сервиса базы данных
const appId = "app-gzhil";
const client = Stitch.initializeDefaultAppClient(appId);
const mongodb = client.getServiceClient(RemoteMongoClient.factory,"mongodb-atlas");
// Подключение к базе данных
const db = mongodb.db("firstApp");
// Подключение к колекции базы данных
const collection = db.collection("Task");
// Иницилизация нового пользователя
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});


// @route   host: api/task/
router.get("/", async (req, res) => {
    try{
        const get_data_from_database = await collection.find({}, {sort: {_id: -1}, limit: 3 }).asArray();
        res.send(get_data_from_database);
    }catch(e) {
        res.status(404).json({
            "errors": e
        });
    }
});

// @route   host: api/task/add-task
router.post("/add-task", async (req, res) => {
    try{
        const newtask = req.body;
        const send_data_to_database = await collection.insertOne(newtask);
        res.send(send_data_to_database);
    }catch(e){
        res.status(404).json({
            "errors": e
        });
    }
});

// @route   host: api/task/delete/:id
router.delete("/delete/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const token = req.token;
        const verify_user = await db.collection("Autorisation").find({token: token}).asArray();

        if(!(Object.keys(verify_user).length === 0)){
            const delete_task_from_database = await collection.deleteOne({_id: id});
            res.send({"Error": "Task was daleted"});
        }else{
            res.send({"Error": "Task wasn't daleted"});
        }
    }
    catch(e) {
        res.send({"errors": e});
    }
});

// +++++++++++++++++++++++++++++++++++++++ Pagination and filter ++++++++++++++++++++++++++++++++

// @route   host: api/task/pagination
router.post("/pagination", async (req, res) => {
const newtask = req.body;
const ckipe = newtask.limit * (newtask.page - 1);
const pipeline = [newtask.limit, ckipe, newtask.filter];

    try {
        const get_data_from_database = await client.callFunction("Pagination", pipeline);
        res.send(get_data_from_database);
    }catch(e) {
        res.send({"errors": e});
    }
});

// @route   host: api/task/param_id/status_name
router.put("/status/:id/:status", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const new_status = (req.params.status)
        const token = req.token;
        
        const verify_user = await db.collection("Autorisation").find({token: token}).asArray();

        if(!(Object.keys(verify_user).length === 0)){
            const delete_task_from_database = await collection.findOneAndUpdate({_id: id}, {$set: {
                Status: new_status
            }});
            res.send({"Sucsses": "Status was updated"});
        }else{
            res.send({"Error": "Status wasn't updated"});
        }
    }
    catch(e) {
        res.send({"Error": e});
    }
});

// @route   host: api/task/update/param_id
router.put("/update/:id", async (req, res) => {
    try{
        const id = new ObjectId(req.params.id);
        const token = req.token;
        const new_task = req.body;

        const verify_user = await db.collection("Autorisation").find({token: token}).asArray();

        if(!(Object.keys(verify_user).length === 0)){
            await collection.findOneAndUpdate({_id: id}, {$set: {
                ...new_task
            }});
            res.send({"Sucsses": "Task was updated"});
        }else{
            res.send({"Error": "Task wasn't updated"});
        }
    }
    catch(e) {
        res.send({"Error": e});
    }
});

// @route   host: api/task/param_request
router.get("/search/:request", async (req, res) => {
    const search_request = req.params.request;

    const url = encodeURI(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app-gzhil/service/http/incoming_webhook/search_request?arg1=${search_request}`)
    
    try {
        const result = await axios.get(url);
        const jsonText = JSON.stringify(result.data); 
        res.send(jsonText);
    }catch(e) {
        res.send(`"Error": ${e}`);
    }
});


module.exports = router

