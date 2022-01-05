const mongoose = require("mongoose");

const contact = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    number : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    event : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model("contact", contact);