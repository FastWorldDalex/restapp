const jwt = require("jsonwebtoken")

const generarJWT = (id, name, email) => {

    const payload = { id, name, email };
    console.log('sdfsdf', name)
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            try {
                resolve(token);
            } catch (error) {
                console.log(error);
                reject(err);
            }
        });
    });
}

module.exports = {
    generarJWT
}