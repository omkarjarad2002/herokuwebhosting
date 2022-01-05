const express = require("express");
const app = express();
require("./db/conn");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const users = require("./models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const contact = require("./models/contact"); 
const port = process.env.PORT || 2000;



// app.post("/create", async (req,res) => {
//     const {username,userpassword} = req.body;

//     if(!username || !userpassword)
//        return res.status(400).json({message:"Bad request!"})

//     const password = await bcrypt.hash(userpassword,10)   

//    try{ 
//     const user = await users.create({username,userpassword:password})

//     const secret="059abdcc53b328574c35456cf8ed44c46a0f12e2ff5e0513ea16484f0401c85adb3244e47e1d755cd4586862dbd1f6fb1bf6764c8c0bc43ccfa16df140b67781" 
        
//     const token = jwt.sign({username},secret);

//     return res.json({token,auth:true})

//    }catch(err){
//     console.log(err)
//     return res.status(500).json({message:"Internal server error!"})
//    }
     
// })

// user authentication login

app.post("/login", async (req,res) => {
    const {username,userpassword} = req.body;

    if(!username || !userpassword)
       return res.status(400).json({message:"Bad request!"})

    try{
        const founduser = await users.findOne({username})

        if(!founduser)
            return res.status(404).json("No user found!") 

        const isvalide = bcrypt.compare(userpassword,founduser.userpassword);

        if(!isvalide)
            return res.status(401).json("Invalide")

        const secret="059abdcc53b328574c35456cf8ed44c46a0f12e2ff5e0513ea16484f0401c85adb3244e47e1d755cd4586862dbd1f6fb1bf6764c8c0bc43ccfa16df140b67781" 
        
        const token = jwt.sign({username},secret);

        return res.json({token,auth:true})


    } catch(error){
        return res.status(500).json({message:"Internal server error!"})
    }
     
})

app.post("/contact", async(req,res)=>{
    const {name,number,address,event} = req.body;
    const Contact = new contact({name, number, address, event});
    try {
        await Contact.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
        
    }
    res.json("Successfull");
})

app.get("/all/contacts",async(req,res) => {
    try{
        const contacts = await contact.find();
        return res.json({contacts})
    }catch(error){
        return res.status(500).json({message:"Internal server error!"})
    }
   
})

app.delete("/contact/:id",async(req,res)=>{
    try{
        await contact.findOneAndDelete({_id:req.params.id});
        return res.json({ok:true})
    }catch(error){
        return res.status(500).json({message:"Internal server error!"})
    }
})

app.listen(port, ()=>{
    console.log(`Server Listening on ${port}`);
})


