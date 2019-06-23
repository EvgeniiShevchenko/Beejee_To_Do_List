const path = require('path');
const express = require("express");
import bodyParser from "body-parser";
import morgan from "morgan";


const task = require('./routes/api/task');
const login = require('./routes/api/login');

function ensureAuthorized(req, res, next) {
    if(!req.headers["authorization"]) {
        next();
    }else{
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[2];
            req.token = bearerToken;
            next();
        } 
    }
};

const app = express();

app.use(morgan('dev'));
app.use(ensureAuthorized);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/task",  task);
app.use("/api/login", login);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server start on ${port} port!`));

