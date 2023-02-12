const mysql = require('mysql');
require('dotenv').config();

const DDBBconnecion = mysql.createConnection({
          host: process.env.HOST,
          user: process.env.USER,
          password:process.env.PASSWORD,
          database: process.env.DATABASE  
});

DDBBconnecion.connect(async (err)=>{
    if(err){
        throw new Error('Error al momento de inicializar la base de datos');
    }else{
        console.log('FUNCIONA');
    }
    });
// modo prueba



module.exports = {
    DDBBconnecion
}