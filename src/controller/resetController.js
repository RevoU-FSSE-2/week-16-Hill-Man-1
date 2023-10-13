const db = require('../config/db.connection');
const cache = require('memory-cache');
const bcrypt = require('bcrypt');


const sendEmail = (username, key) => {
    console.log(`Subject: Password reset request`);
    console.log(`To: ${username}`);
    console.log(`Body: hit me, http://localhost:3000/password/reset?key=${key}`);
};

const passwordResetRequest = async (req, res) => {
    const { username } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
    }
    const key = Math.random().toString(36).substring(2, 15);
    cache.put(key, user.username, 5 * 60 * 1000);
    sendEmail(user.username, key);
    res.json({ message: "Password reset email sent" });
};



const passwordReset = async (req, res) => {
    const { password } = req.body;
    const { key } = req.query;
    
    console.log("Received key:", key);
    console.log("Cache keys:", cache.keys());

    const username = cache.get(key);
    console.log("Username from cache:", username);

    if (!username) {
        res.status(400).json({ error: "Invalid token" });
        return;
    }
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    
    if (!user) {
        res.status(400).json({ error: "error" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);
    cache.del(key);
    res.json({ message: "Password reset success" });
};

module.exports = {passwordReset, passwordResetRequest}
