const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt.js');

const authorizationAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    } else {
        const token = authHeader.split(' ')[1];
    
        try {
            const decodedToken = jwt.verify(token, JWT_SIGN);
            if (decodedToken.role === 'admin') {
                next();
            } else {
                res.status(401).json({ error: 'Authentication required.' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const authorizationLibrarian = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        const token = authHeader.split(' ')[1]
    
    try {
        const decodedToken = jwt.verify(token, JWT_SIGN)
    if (decodedToken.role === 'librarian') {
        next()
    } else {
        res.status(401).json({ error: 'Authentication required.' })
    }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    }
}

const authorizationUser = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        const token = authHeader.split(' ')[1]
        
    
    try {
        const decodedToken = jwt.verify(token, JWT_SIGN)
    if (decodedToken.role === 'user') {
        next()
    } else {
        res.status(401).json({ error: 'Authentication required.' })
    }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    }
}

module.exports = { authorizationAdmin, authorizationLibrarian, authorizationUser }