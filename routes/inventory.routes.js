const {invModel} = require("../models/inventory.model");
const { authenticate } = require("../middlewares/auth");
const { authorise} = require("../middlewares/authorise")
const express = require("express");
const invRouter = express.Router();

invRouter.post("/addcar",authenticate,authorise(["Dealer"]),async(req,res)=>{

try{
    const car = new invModel(req.body);
    await car.save();
    res.send({msg:"New Car has been added"})
}
 
catch(err){
    res.send({err})
}

})



invRouter.get("/getcar",authenticate,async(req,res)=>{



    try {
      const { name: titl, page = 1, limit = 20 } = req.query;
  
      if (req.query.titl == undefined) {
  
          let skip = (page - 1) * limit;
        let skippeddata = await invModel.find().skip(skip).limit(limit);
        res.send(skippeddata);
      } else {
        let skip = (page - 1) * limit;
        let skippeddata = await invModel.find({
          name: { $regex: req.query.titl, $options: "i" }
        })
          .skip(skip)
          .limit(limit);
  
        res.send(skippeddata);
      }
    } catch (err) {
      res.send(err.message);
    }


})



invRouter.get("/getdealerscar",authenticate,async(req,res)=>{




  try {
    const { name: titl, page = 1, limit = 20 } = req.query;

    if (req.query.titl == undefined) {

        let skip = (page - 1) * limit;
      let skippeddata = await invModel.find({userID:req.body.userID}).skip(skip).limit(limit);
      res.send(skippeddata);
    } else {




      let skip = (page - 1) * limit;
      let skippeddata = await invModel.find(
       
      {
        userID:req.body.userID,
        name: { $regex: req.query.titl, $options: "i" }
      })
        .skip(skip)
        .limit(limit);

      res.send(skippeddata);
    }
  } catch (err) {
    res.send(err.message);
  }

})



invRouter.patch("/update/:id",authenticate,async(req,res)=>{
    const id = req.params.id
      const user  = await invModel.find({_id:id})
    
      if(user[0].userID == req.body.userID){
         
        const update = await invModel.findByIdAndUpdate({_id:id},req.body)
          res.send({msg:"cars data has been updated"})
    
      }
      else{
        res.send({msg:"not authorised"})
      }
    
    })
    
    invRouter.delete("/delete/:id",authenticate,async(req,res)=>{
      const id = req.params.id
        const user  = await invModel.find({_id:id})
      
        if(user[0].userID == req.body.userID){
         
          await invModel.findByIdAndDelete ({_id:id})
            res.send({msg:"cars data has been deleted"})
    
        }
        else{
          res.send({msg:"not authorised"})
        }
    
      })
    






module.exports = {
    invRouter
};





// "_id": "64b6d02f3e30057c2333ecd8",
// "name": "audi",
// "price": 20,
// "mileage": 20,
// "kmsrun": 4000,
// "scratches": 2,
// "color": "black",
// "originalpaint": true,
// "numofaccidents": 0,
// "previousbuyers": 1,
// "registrationplace": "kolkata",
// "image": "data:image/jpeg;base64,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"

// }