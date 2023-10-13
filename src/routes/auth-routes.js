const { Router } = require('express')
const { register, login, logout, refresh} = require('../middleware/authMiddleware');
const loginLimiter  = require('../middleware/rateLimiter')
const authRouter = Router()

// User registration route
authRouter.post('/register', register);

// User login route
authRouter.post('/login', loginLimiter, login);

// User logout route
authRouter.post('/logout', logout);

authRouter.post('/refresh', refresh);

module.exports = authRouter;
