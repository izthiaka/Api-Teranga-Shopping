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

// Auth routes
router.post('/register', validRegister, registerController.register);
router.post('/activation', activationController.activate);
router.post('/login', validLogin, loginController);

// Export API routes
module.exports = router;