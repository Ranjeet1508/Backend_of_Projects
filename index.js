const express = require("express");
const  {connection}  = require("./config/db");
const  {userRouter}  = require("./Routes/userRoute")
const  {todoRouter}  = require('./Routes/todoRoute')
const {productRouter} = require("./Routes/productRoute")
const {asiaRouter} = require('./Routes/asiaRoutes')
const {africaRouter} = require('./Routes/africaRoutes');
const {europeRouter} = require('./Routes/europeRoutes');
const {latinamericaRouter} = require('./Routes/latinamericaRoutes');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: "*"
}))
app.use(express.json());

app.use("/user",userRouter);
//app.use("/todo",todoRouter);
app.use("/product",productRouter);
app.use("/asia",asiaRouter);
app.use("/africa",africaRouter);
app.use("/europe",europeRouter);
app.use("/latinamerica",latinamericaRouter);


app.listen(PORT, async() => {
    try {
        await connection
        console.log("connected to db ")
    } catch (error) {
        console.log("didn't connected to db")
    }
})