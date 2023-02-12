const { response } = require("express");
const jwt = require('JsonWebToken');

const validarJWT = async (req, res = response, next) => {

    const Token = await req.header('x-token');
    if (!Token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token.'
        });
    }

    try {

       const {id:Id,name:Name,email:Email}= jwt.verify(Token,process.env.SECRET_JWT_SEED);
       console.log(Name)
       req.id = Id;
       console.log(Id);
       req.name = Name;
       req.email = Email;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido.'
        });
    }

    next();
};

module.exports = {
    validarJWT
}