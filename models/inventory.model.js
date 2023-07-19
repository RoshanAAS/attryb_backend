const mongoose = require("mongoose")


const invSchema = mongoose.Schema({

name:String,
price:Number,
mileage:Number,
kmsrun:Number,
scratches:Number,
color:String,
originalpaint:Boolean,
numofaccidents:Number,
previousbuyers:Number,
registrationplace:String,
image:String,
userID:String
})

const invModel = mongoose.model("inventory",invSchema)

module.exports = {
    invModel
};



