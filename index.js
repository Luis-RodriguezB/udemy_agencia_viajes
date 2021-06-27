import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env'});

const app = express();

db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Habilitar PUG
app.set('view engine', 'pug');

app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de viajes';
    return next();
});

app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Habilitar Pug
app.use('/', router);

const host  = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando...')
});