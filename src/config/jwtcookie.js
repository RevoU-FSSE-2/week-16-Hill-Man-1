const db = require('../config/db.connection');
const jwt = require('jsonwebtoken');

class JWTAuthCookies extends BaseAuth {
    async getUser(req) {
        const token = req.cookies?.accessToken;  // Assuming your access token cookie is named "accessToken"
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SIGN);
                const { username } = decoded; 
                const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
                const user = users[0];
                return user;
            } catch (e) {
                console.log("TOKEN EXPIRED");
                return null;
            }
        }
        return null;
    }
}
module.exports = JWTAuthCookies;
