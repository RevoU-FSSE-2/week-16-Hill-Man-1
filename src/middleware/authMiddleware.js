const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt');
const db = require('../config/db.connection');
const cache = require('memory-cache');

const generateToken = (user) => {
    const expireAt = Math.floor(Date.now() / 1000) + (1 * 20); // 20 Sec
    const refreshExpireAt = Math.floor(new Date().setDate(new Date().getDate() + 7)); // 7 days
    const iat = Math.floor(Date.now());
    const accessToken = jwt.sign({
        username: user.username,
        role: user.role, 
        exp: expireAt,
        iat: iat
    }, process.env.JWT_SIGN);
    const refreshToken = jwt.sign({
        username: user.username,
        iat: iat,
        exp: refreshExpireAt,
    }, process.env.JWT_SIGN);
    return { accessToken, refreshToken, expireAt, iat };
};

const parseToken = async (token, options) => {
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    const { username } = decoded; 
    return await this.get_without_password({username}, options);
}

const parseTokenSafe = async (token, options) => {
    try {
        return await parseToken(token, options);
    } catch (e) {
        console.log("TOKEN EXPIRED");
        return null;
    }
}

const getUserByUsername = async (username) => {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return users[0];
}

const register = async (req, res, next) => {
    const { username, password, name, address, age, role } = req.body;

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(401).json({ error: 'Username Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (username, password, name, address, age, role, roleStatus) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const newUser = await db.query(sql, [username, hashedPassword, name, address, age, role, 'pending']);
        res.status(201).json({
            message: 'User registration successful',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        if (user[0].roleStatus === 'pending') {
            throw new Error('Wait for Approval from Admin');
        }

        const { accessToken, refreshToken, expireAt, iat } = generateToken(user[0]);

        res.status(200).json({
            message: `${user[0].username} Login successful`,
            accessToken,
            refreshToken,
            expireAt,
            iat
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie('accesToken');
    res.clearCookie('refreshToken');
    res.status(201).json({
        message: 'User Logout successful',
    });
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.JWT_SIGN);
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [decodedToken.username]);
        const user = users[0];
        
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        const responseToken = generateToken(user);
        res.json(responseToken);
    } catch (e) {
        console.error(e);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { register, login, logout, refresh };
