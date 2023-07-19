const express = require("express");
const { OEMModel } = require("../models/OEM.model");
const { authenticate } = require("../middlewares/auth");
const OEMRouter = express.Router();

OEMRouter.post("/addCar", authenticate, async (req, res) => {
  const {image, name, year, price, colors, mileage, power, maxSpeed } = req.body;
  try {
    const car = new OEMModel({
      name,
      year,
      price,
      colors,
      mileage,
      power,
      maxSpeed,
      image
    });
    await car.save();
    res.send({ msg: "car has been added" });
  } catch (err) {
    res.send(err);
  }
});

OEMRouter.get("/cars/paginate", async (req, res) => {

  try {
    const { name: titl, page = 1, limit = 10 } = req.query;

    if (req.query.titl == undefined) {
        let skip = (page - 1) * limit;
      let skippeddata = await OEMModel.find().skip(skip).limit(limit);
      res.send(skippeddata);
    } else {
      let skip = (page - 1) * limit;
      let skippeddata = await OEMModel.find({
        name: { $regex: req.query.titl, $options: "i" }
      })
        .skip(skip)
        .limit(limit);

      res.send(skippeddata);
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  OEMRouter,
};




// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI2OTg4NGU2NjRkZmVjYzcyNDRhNjEiLCJyb2xlIjoiQ29uc3VtZXIiLCJpYXQiOjE2ODk2OTAxNjcsImV4cCI6MTY4OTY5MDI4N30.xMKeqqcIOpHhdXpdmywEGxJdOQNOQ71g5bDfLTPAnxM",
// "refreshtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGI2OTg4NGU2NjRkZmVjYzcyNDRhNjEiLCJyb2xlIjoiQ29uc3VtZXIiLCJpYXQiOjE2ODk2OTAxNjcsImV4cCI6MTY4OTY5MDQ2N30.vXeUYJteCn2OddawlAgKbLehr5da0sZHJ82iGxumjqE"

// {

//     "name":"BMW3",
//     "year":"2002-01-02",
//     "price":1000,
//     "colors":["blue","blue"],
//     "mileage":20,
//      "power":5,
//      "maxSpeed":100

//     }
