const express = require("express");
const  {connection}  = require("./config/db");
const  {userRouter}  = require("./Routes/userRoute")
const  {todoRouter}  = require('./Routes/todoRoute')
const {productRouter} = require("./Routes/productRoute")
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: "*"
}))
app.use(express.json());

//app.use("/user",userRouter);
app.use("/todo",todoRouter);
app.use("/product",productRouter)


app.listen(PORT, async() => {
    try {
        await connection
        console.log("connected to db ")
    } catch (error) {
        console.log("didn't connected to db")
    }
})