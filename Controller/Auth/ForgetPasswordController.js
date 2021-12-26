// Import User model
User = require('../../Model/UserModel')

const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../Helpers/dbErrorHandling')
const { validationResult } = require('express-validator')

// Send email sendgrid from nodemaile
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)

exports.forget = (req, res) => {
    const {email} = req.body
    const errors = validationResult(req)

    // Validation to req.body we will create custom validation in seconds
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        // If user exist
        User.findOne({
            email
        }).exec((err, user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "User with this email does not exist"
                })
            }

            // If exist
            // Generate token for user with this id valid for only 10 minutes
            const token = jwt.sign(
                {
                    _id: user._id
                }, process.env.JWT_RESET_PASSWORD,
                {
                    expiresIn: '10m'
                }
            )

            // Send email with token
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: to,
                subject: "Réinitialisation mot de passe",
                html: `
                    <h1>Please Click to link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                    <hr>
                    <p>This email contain sensetive info</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
            }

            return user.updateOne({
                resetPasswordLink: token
            }, (err, success) => {
                if(err){
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }else{
                    sgMail.send(emailData).then(sent => {
                        return res.json({
                            message: `Email has been sent to ${emal}`
                        })
                    }).catch(err => {
                        return res.json({
                            message: err.message
                        })
                    })
                }
            })
        })
    }

}