// Import User model
User = require('./../../Model/UserModel');

const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client} = require('google-auth-library')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
// Custom error handler to get useful error from database error
const { errorHandler } = require('./../../Helpers/dbErrorHandling')
// Send email sendgrid from nodemaile
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)

// Handle Register action
exports.register = function (req, res) {
    const {name, email, password} = req.body
    const errors = validationResult(req)

    // Validation to req.body we will create custom validation in seconds
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err, user) => {
            // If user exists
            if(user){
                return res.status(400).json({
                    error: "Email taken"
                })
            }
        })
        // Generate Token
        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15m'
            }
        )
        // Email data sending 
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "Activation compte",
            html: `
                <h1>Please Click to link to activate</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr>
                <p>This email contain sensetive info</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Email has been sent to ${email}`
            })
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })
    }
}