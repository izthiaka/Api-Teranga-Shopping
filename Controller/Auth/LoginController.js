// Import User model
User = require('./../../Model/UserModel')
const { OAuth2Client} = require('google-auth-library')
const _ = require('lodash')

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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
exports.google = (req, res) => {
    const {
        idToken
    } = req.body

    // Get token from request

    // Verify token
    client.verifyToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT
    }).then(response => {
        const {
            email_verified,
            name,
            email
        } = response.payload
        // Check if email verified
        if(email_verified){
            User.findOne({email}).exec((err, user) => {
                // Find if this email already exists
                // If exist
                if(user){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                        expiresIn: '7d'
                    })

                    const {_id, email, name, role} = user;
                    return res.json({
                        token, user: {_id, email, name, role}
                    })
                }else{
                    // If user not exists we will save in database and generate password for it
                    let password = email + process.env.JWT_SECRET;
                    user = new User({name, email, password})
                    user.save((err, data) => {
                        if(err){
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }

                        // If no error generate token
                        const token = jwt.sign(
                            {_id: data._id},
                            process.env.JWT_SECRET,
                            {expiresIn: '7d'}
                        )
                        const {_id, email, name, role} = data;
                        return res.json({
                            token,
                            user: {_id, email, name, role}
                        })
                    })
                }
            })
        }else{
            // If error
            return res.status(400).json({
                error: "Google login failed. Try again"
            })
        }
    })
}