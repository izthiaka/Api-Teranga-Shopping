// Import User model
User = require('../../Model/UserModel')

const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../Helpers/dbErrorHandling')
const { validationResult } = require('express-validator')

exports.reset = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body
    const errors = validationResult(req)

    // Validation to req.body we will create custom validation in seconds
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(resetPasswordLink){
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded){
                if(err){
                    return res.status(400).json({
                        error: 'Expired link, try again'
                    })
                }
                User.findOne({ resetPasswordLink }, (err, user) => {
                    if(err || !user){
                        return res.status(400).json({
                            error: "Something went wrong. Try later"
                        })
                    }

                    const updatedfields = {
                        password: newPassword,
                        resetPasswordLink: ""
                    }

                    user = _.extend(user, updatedfields)
                    user.save((err, result) => {
                        if(err){
                            return res.status(400).json({
                                error: "Error reseting user password"
                            })
                        }
                        res.json({
                            message: "Great! Now you can login with new password"
                        })
                    })
                })
            })
        }
    }

}