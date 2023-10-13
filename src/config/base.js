const db = require('./config/db.connection');

class BaseAuth {

    async getUser(req){
        // Assuming you have some way to identify the user from the request
        const username = req.someIdentifier;  
        
        try {
            const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            return users[0];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async authenticate(req, res, next){
        if (!req.user){
            const user = await this.getUser(req);
            if (user){
                req.user = user; // inject user into request object
            }
        }
    }
}
module.exports = BaseAuth;
