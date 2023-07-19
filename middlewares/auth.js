const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BlackModel } = require("../models/black.model");

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (token) {
    const black = await BlackModel.find({ token });
    if (black.length > 0) {
      res.send({ msg: "login again" });
    } else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userID = decoded.userID;
        req.role = decoded.role;
        console.log(req.body);
        next();
      } catch (err) {
        if (err.message == "jwt expired") {
          res.send({ msg: err.message });
        } else {
          res.send(err);
        }
      }
    }
  } else {
    res.send({ msg: "login again" });
  }
};

module.exports = {
  authenticate,
};
