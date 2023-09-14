const {Router} = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require('../Model/userModel');
require('dotenv').config();


userRouter.get("/", (req,res) => {
    res.send("base users api Successfull")
})

userRouter.post("/signup", async (req,res) => {
    const {fullName,email,password} = req.body;
    const user = await UserModel.findOne({"email":email})
    if(user){
        return res.send({msg: "user already exist"})
    }
    bcrypt.hash(password, 2,async function(err, hash) {
        const new_user = await new UserModel({
            fullName,
            email,
            password: hash,
        })
        new_user.save();
        res.send("Signup Successfull");
    });
})

userRouter.post("/login", async (req,res) => {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.send({msg: "user doesn't exist, Signup first"})
    }
    const hashed_password = user.password;
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(err){
            return res.send({msg: "Internal Server Error" , err})
        }

        if(result){
            const token = jwt.sign({userID: user._id}, process.env.SECRET_KEY);
            return res.send({msg: "Login Successfull", token: token})
        }
        else {
            return res.send({msg: "Wrong Credentials"})
        }
    });
})


module.exports = {
    userRouter
}
