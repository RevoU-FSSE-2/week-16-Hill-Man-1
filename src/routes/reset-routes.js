const { Router } = require('express');
const { passwordReset, passwordResetRequest} = require('../controller/resetController');

const resetRouter = Router();

resetRouter.post("/requestreset", passwordResetRequest);
resetRouter.post("/reset", passwordReset);

module.exports = resetRouter;