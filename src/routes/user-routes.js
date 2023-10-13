const { Router } = require('express');
const { authorizationUser } = require('../middleware/authorizeMiddleware');
const userController = require('../controller/usersController');

const userRouter = Router();

userRouter.get('/allbooks', authorizationUser, userController.getAllBooks); 
userRouter.get('/books/:bookStatus', authorizationUser, userController.searchBookStatus); 
userRouter.patch('/updatebookstatus/:id', authorizationUser, userController.updateBookStatus); 

module.exports = userRouter;
