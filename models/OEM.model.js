const mongoose = require("mongoose")


const OEMSchema = mongoose.Schema({
name:String,
year:Date,
price:Number,
colors:[String],
mileage:Number,
power: Number,
maxSpeed:Number,
image:String
    
})

const OEMModel = mongoose.model("OEM_spec",OEMSchema)

module.exports = {
    OEMModel
};


// { 
//     "name":"Hyundai Exter",
//     "year":"2005-08-02",
//     "price":50000,
//     "colors":["red","grey","black"],
//     "mileage":10,
//     "power":200,
//     "maxSpeed":250,
//     "image":"https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Exter/9482/1684926596004/front-left-side-47.jpg?tr=w-456"
        
//         }