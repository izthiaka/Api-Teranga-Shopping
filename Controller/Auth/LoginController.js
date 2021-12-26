// Import User model
User = require('./../../Model/UserModel')

const { validationResult } = require('express-validator')
const { errorHandler } = require('../../Helpers/dbErrorHandling')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const {email, password} = req.body
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
                    error: "User with this email does not exist, Please Sign up"
                })
            }

            // Athenticate
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error: "Email and Password do not match"
                })
            }

            // Generate Token
            const token = jwt.sign(
                {
                    _id: user._id
                }, process.env.JWT_SECRET,
                {
                    expiresIn: '7d'
                }
            )

            const { _id, name, email, role } = user
            return res.json({
                token, 
                user: {
                    _id,
                    name,
                    email,
                    role
                }
            })
        })
    }

}