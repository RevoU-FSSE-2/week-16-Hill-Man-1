const express = require('express');
const { Router } = require('express'); // Correct import statement
const { authorizationAdmin } = require('../middleware/authorizeMiddleware');
const adminController = require('../controller/adminController');

const adminRouter = Router();

adminRouter.get('/books', authorizationAdmin, adminController.getAllBooks);
adminRouter.get('/users', authorizationAdmin, adminController.getAllUsers);
adminRouter.get('/user/:id', authorizationAdmin, adminController.getUsersById);
adminRouter.post('/book', authorizationAdmin, adminController.inputBook);
adminRouter.patch('/user/:id', authorizationAdmin, adminController.updateRoleStatus);
adminRouter.patch('/book/:id', authorizationAdmin, adminController.updateBook);

adminRouter.delete('/book/:id', authorizationAdmin, adminController.deleteBook);
adminRouter.delete('/user/:id', authorizationAdmin, adminController.deleteUser);

module.exports = adminRouter;
