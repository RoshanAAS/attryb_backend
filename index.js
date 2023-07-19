const express = require("express");
const { connection } = require("./configs/db");
const {userRouter} = require("./routes/user.routes")
const {OEMRouter} = require("./routes/OEM.routes")

const cors = require("cors");
const { invRouter } = require("./routes/inventory.routes");
const app = express();
app.use(express.json())
require("dotenv").config()
app.use(cors())
app.use("/users",userRouter)

 app.use("/oem",OEMRouter)
app.use("/",invRouter)

app.listen(process.env.port,async()=>{
    await connection
    console.log(`server is running at port ${process.env.port}`)
})