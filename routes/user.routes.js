const {UserModel} = require("../models/user.model")
const express = require("express")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {BlackModel} = require("../models/black.model")

userRouter.post("/register",async(req,res)=>{

const {name,email,password,role} = req.body;

const checkuser = await UserModel.find({email})

if(checkuser.length>0){
    res.status(200).send({msg:"user already exist please login"})
}
else{

    try{
 

          bcrypt.hash(password,5,async(err,hash)=>{
                 const user = new UserModel({name,email,password:hash,role})
                 await user.save()
                 res.status(200).send({msg:"user has been registered"})

          })

    }
    catch(err){
        res.status(400).send(err)
    }
}

})

userRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    const user = await UserModel.find({email})

    if(user.length==0){
        res.send({msg: "user does not exist please signup"})
    }
    
    else{
              
        bcrypt.compare(password,user[0].password,(err,result)=>{
                 
            if(result){

              
                 const token = jwt.sign({userID:user[0]._id,role:user[0].role},process.env.JWT_SECRET)
                res.status(200).json({token,user})


            }
            else{
                res.send({msg:"wrong credentials"})
            }


        })



    }

})



userRouter.get("/logout",async(req,res)=>{

let token = req.headers.authorization.split(" ")[1]

let black = new BlackModel({token})

await black.save();
res.send({msg:"logout successfull"})


})

module.exports = {
    userRouter
};


// {
//     "name":"keerti",
//     "email":"keerti@gmail.com",
//     "password":"keerti",
//     "role":"Consumer"
//   }

// token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI2OTg4NGU2NjRkZmVjYzcyNDRhNjEiLCJyb2xlIjoiQ29uc3VtZXIiLCJpYXQiOjE2ODk2OTA1NjYsImV4cCI6MTY4OTY5MDY4Nn0.sRRlVsJjnppKOgcDn8tplkR5phmlZYiqyKiIha1arfI",
//   "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI2OTg4NGU2NjRkZmVjYzcyNDRhNjEiLCJyb2xlIjoiQ29uc3VtZXIiLCJpYXQiOjE2ODk2OTA1NjYsImV4cCI6MTY4OTY5MDg2Nn0.GzpICwT2KYOUflbEM1G2siguLAdK6b3sXtC7Rx5b34w"