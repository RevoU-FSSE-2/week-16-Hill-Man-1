const express= require ("express");
const jwt = require('jsonwebtoken');
require ('dotenv/config');
const { db } = require ("./config/db.connection");
const bodyParser= require ("body-parser");
const authRouter = require ("./routes/auth-routes");
const adminRouter = require ("./routes/admin-routes");
const librarianRouter = require ("./routes/librarian-routes");
const userRouter = require ("./routes/user-routes");
const resetRouter = require ("./routes/reset-routes");
const refresh = require ("./middleware/authMiddleware")
const { JWT_SIGN }= require ("./config/jwt"); 
const mysql = require('mysql2/promise');
const fs = require('fs');
const cookieParser = require('cookie-parser')




const app = express();
const port = process.env.port || 7935

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req.cookies, "COOKIES");
    console.log(req.user , "<============= USER");
    res.send('Hello World!');
});
app.get('/check-cookie', (req, res) => {
    if (req.cookies.accessToken) {
        res.send('Cookie is set!');
    } else {
        res.send('Cookie is not set.');
    }
});






app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/librarian', librarianRouter);
app.use('/user', userRouter);
app.use('/password', resetRouter);



(async () => {
    try {
        await db.connect();
        console.log("MySQL successfully connected");
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
    }
});

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});
