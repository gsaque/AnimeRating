const authService = require('../services/authService');

const authenticateMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const tokenWithoutBearer = token.split(' ')[1];
        const decoded = authService.verifyToken(tokenWithoutBearer);
        req.user = decoded; // Adiciona o usuário decodificado ao objeto de requisição
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token inválido' });
    }
};


module.exports = {
    authenticateMiddleware,
};
