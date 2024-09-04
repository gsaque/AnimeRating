const authService = require('../services/authService');
const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = authService.generateToken(user);
    res.json({ token });
};

module.exports = {
    login,
};
