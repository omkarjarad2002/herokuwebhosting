const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://omkar:Cb35WtEVbyDs2WnP@cluster0.sdtgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{console.log("Connection Successfull")}).catch((error)=>{console.log(error)});