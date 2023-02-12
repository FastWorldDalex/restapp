const { response } = require('express');
const { DDBBconnecion } = require('../db/config');
const { Usuario, crearUsaurio, actualizarUsuario, ExisteUsuario } = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = (req, res = response) => {
    const { name: Name, email: Email, password: Password } = req.body;

    try {
        let usuario = new Usuario(0, Name, Email, Password);
        ExisteUsuario(DDBBconnecion, Email, async (GET) => {
            //const{email}=GET[0];
            if (GET.length > 0) {
                return res.status(424).json({
                    ok: false,
                    msg: 'El correo ya existe.'
                });
            }

            const salt = bcrypt.genSaltSync(15);
            usuario.password = bcrypt.hashSync(Password.toString(), salt);



            crearUsaurio(DDBBconnecion, usuario, (POST) => {
                console.log("USAURIO REGISTRADO", POST);
                ExisteUsuario(DDBBconnecion, Email, async (GET2) => {
                    console.log(GET2)

                    const token = await generarJWT(GET2[0].id, GET2[0].name, GET2[0].email);

                    return res.status(201).json({
                        ok: true,
                        msg: 'Usuario creado.',
                        token: token
                    });
                });
            });

        });
        //hashear passsword

        //generar token

        // generar respuesta

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno.'
        });
    }




    // const rpta = await DDBBconnecion.query('insert into usuario set ?', req.body, function(error,results,fields){
    //     if(error){
    //         throw new Error(error);
    //     }
    //     console.log('results', results);
    // });



};

const login = async (req, res = response) => {
    const { email: Email, password: Password } = req.body;
    try {
        const usuario = new Usuario(0, '', Email, Password);

        ExisteUsuario(DDBBconnecion, Email, async (GET) => {
            //const{email}=GET[0];
            if (GET.length == 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o contraseña incorrectos.'
                });
            }

            //confirmar password
            const validPassword = bcrypt.compareSync(usuario.password.toString(), GET[0].password.toString());
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o contraseña incorrectos.'
                });
            }

            const Token = await generarJWT(GET[0].id, GET[0].name, usuario.email);
            console.log(GET[0].id);
            console.log(GET[0].name);
            return res.status(200).json({
                ok: true,
                msg: 'Success',
                id: GET[0].id,
                name: GET[0].name,
                token: Token
            })
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Error interno.'
        });
    }
};
const renewUser = async (req, res = response) => {

    const { id: Id, name: Name, email: Email } = req;
    const Token = await generarJWT(Id, Name, Email);
    console.log(Name)
    return res.json({
        ok: true,
        msg: 'sucess',
        id: Id,
        name: Name,
        token: Token
    })
};

// const updateUser = (req, res = response) => {
//     const { name, email, password } = req.body;
//     try {
//         let usuario = new Usuario(3, name, email, password);
//         actualizarUsuario(DDBBconnecion, usuario2, (result) => {
//             return res.json({
//                 ok: true,
//                 msg: 'Usuario Actualizado'
//             })
//         });
//     } catch (error) {
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error interno.'
//         })
//     }
// };
module.exports = {
    createUser: crearUsuario,
    loginuser: login,
    renewUser: renewUser
}