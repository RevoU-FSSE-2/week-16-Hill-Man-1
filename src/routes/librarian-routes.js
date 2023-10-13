const { Router } = require('express');
const { authorizationLibrarian } = require('../middleware/authorizeMiddleware');
const librarianController = require('../controller/librarianController');

const librarianRouter = Router();

librarianRouter.get('/allbooks', authorizationLibrarian, librarianController.getAllBooks);
librarianRouter.get('/users', authorizationLibrarian, librarianController.getUsers); 
librarianRouter.post('/inputbook', authorizationLibrarian, librarianController.inputBook); 
librarianRouter.patch('/updatebook/:id', authorizationLibrarian, librarianController.updateBook); 
librarianRouter.delete('/deletebook/:id', authorizationLibrarian, librarianController.deleteBook);

module.exports = librarianRouter;
