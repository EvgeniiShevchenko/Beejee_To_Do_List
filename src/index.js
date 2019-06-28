import  path from 'path';
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import ensureAuthorized from "./validations/ensureAuthorized";


const task = require('./routes/api/task');
const login = require('./routes/api/login');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(ensureAuthorized);// Промежуточная функция проверки уровня доступа

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

