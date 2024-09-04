// middleware de autorização admin
const authorizeAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    authorizeAdminMiddleware
};
