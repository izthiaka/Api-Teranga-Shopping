var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    gender: String,
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "inactive"
    },
    hashed_password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    salt: String,
    role: {
        type: String,
        default: "Client"
    },
    resetPasswordLink: {
        date: String,
        default: ''
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
userSchema.set('timestamps', true);

userSchema.virtuel('password')
    .set(function(password){
        // Set Password note you must use normal function not arrow function
        this.password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })

// Methods
userSchema.methods = {
    // Generate Salt
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    // Encrypt Password
    encryptPassword: function(password){
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch(err){
            return ''
        }
    },
    // Compare password between plain get from user and hashed
    authenticate: function(plainPassword){
        return this.encryptPassword(plainPassword) === this.hashed_password
    }
}

// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}