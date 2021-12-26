// Initialize express router
let router = require('express').Router();

// Validation
const {
    validRegister,
    validLogin,
    forgetPasswordValidator,
    resetPasswordValidator
} = require('./../../Helpers/valid')

// Import Controller
var loginController = require('./../../Controller/Auth/LoginController');
var registerController = require('./../../Controller/Auth/RegisterController');
var activationController = require('./../../Controller/Auth/ActivationController');
var forgetPwdController = require('./../../Controller/Auth/ForgetPasswordController');
var resetPwdController = require('./../../Controller/Auth/ResetPasswordController');

// Auth routes
router.post('/register', validRegister, registerController.register);
router.post('/activation', activationController.activate);
router.post('/login', validLogin, loginController);
router.put('/password/email', forgetPasswordValidator, forgetPwdController.forget);
router.put('/password/reset', resetPasswordValidator, resetPwdController.reset);

// Export Auth API routes
module.exports = router;