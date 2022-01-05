const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    userpassword : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model("users",userSchema)