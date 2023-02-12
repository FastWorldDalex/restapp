const { json } = require("body-parser");
const mysql = require('mysql');
class Usuario {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    id;
    name;
    email;
    password;
    isExist;
}
function crearUsaurio(connection, usuario, callback) {
    let insertQuery = "INSERT INTO usuario (name,email,password) values(?,?,?)";
    let query = mysql.format(insertQuery, [usuario.name, usuario.email, usuario.password]);
    connection.query(query, function (error, results, details) {
        try {
            callback(results);
        } catch (error) {
            throw new Error(error);
        }
    });
}
function ExisteUsuario(connection, email, callback) {
    let insertQuery = "select id, name, email, password from usuario where email = ?";
    let query = mysql.format(insertQuery, [email]);
    connection.query(query, function (error, results, details) {
        try {
            callback(results);
            console.log(results);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    });
}

function actualizarUsuario(connection, usuario, callback) {
    let updateQuery = "UPDATE usuario set name = ?, email = ?, password = ? WHERE id = ?";
    let query = mysql.format(updateQuery, [usuario.name, usuario.email, usuario.password, usuario.id]);

    connection.query(query, function (error, results, details) {
        try {
            callback(results);
        } catch (error) {
            throw new Error(error);
        }
    });
}
module.exports = {
    Usuario,
    crearUsaurio, 
    ExisteUsuario,
    actualizarUsuario
}