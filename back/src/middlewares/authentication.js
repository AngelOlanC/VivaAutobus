const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            error: 'No hay token en la petición'
        });
    }

    try {
        const { id, username } = jwt.verify(
            token,
            process.env.SECRET_JWT
        );

        req.headers.userId = id;
        req.headers.username = username;


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}