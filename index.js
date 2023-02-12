const express = require('express');
const cors = require('cors');
const { DDBBconnecion } = require('./db/config');
const mysql = require('mysql');
require('dotenv').config();
console.log(process.env)
//Create server/aplication of express
const app = express();

//base de datos
DDBBconnecion;
// DIRECTORIO PUBLIC
app.use( express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo de body
app.use( express.json());


//RUTAS -mideware
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`Server init port ${process.env.PORT}`);
});