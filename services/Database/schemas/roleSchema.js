const mongoose = require("mongoose")
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')


let roleSchema = new Schema({
    code_role: {
        type: String,
        required: true
    },
    role_name:{
        type: String,
        required: true
    }
}, {timestamps: true})

//https://www.npmjs.com/package/mongoose-paginate-v2
roleSchema.plugin(mongoosePaginate)
const RoleRepository = mongoose.model("roles", roleSchema)

module.exports = { default: RoleRepository}
