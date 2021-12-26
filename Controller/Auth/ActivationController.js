const jwt = require('jsonwebtoken')
const { errorHandler } = require('../../Helpers/dbErrorHandling')

exports.activate = (res, res) => {
    const {
        token
    } = req.body

    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION,
            (err, decoded) => {
                if(err){
                    return res.status(401).json({
                        error: 'Expired Token. SignUp again'
                    })
                }else{
                    const { name, email, password } = jwt.decode(token)
                    const user = new User({
                        name, 
                        email, 
                        password
                    })
            
                    user.save((err, user) => {
                        if(err){
                            return res.status(401).json({
                                error: errorHandler(err)
                            })
                        }else{
                            return res.json({
                                success: true,
                                message: "SignUp Success",
                            })
                        }
                    })
                }
            }
        )
    }else{
        return res.json({
            message: "error happening please try again"
        })
    }
}