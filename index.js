const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {connection,BlogModel,UserModel} = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to blog Application" })
})


app.post("/signup", async (req, res) => {
    try {
        const { name, city, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.send({ msg: "Email is already exist" });
        }
        bcrypt.hash(password, 2, function (err, hash) {
            const new_user = new UserModel({
                name,
                city,
                email,
                password: hash
            })
            new_user.save();
        });
        res.send({ msg: "Signup Successfull" })
    } catch (error) {
        console.log(error);
    }

})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.send({ msg: "User doesn't exist, do signup first!" });
    }
    const hashed_password = user.password;
    bcrypt.compare(password, hashed_password, function (err, result) {
        if (!result) {
            return res.send({ msg: "Wrong credentials" })
        }
        else {
            const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY)
            res.send({ msg: "Login Successfull", token: token })
        }
    });
})

const authentication = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
        if(err){
            res.send({msg: "login first"})
        }
        else{
            const {userID} = decoded;
            req.userID = userID;
            next();
        }
    })
}




app.get("/blog",authentication,async(req,res) => {
    const myblogs = await BlogModel.findOne({userID : req.userID})
    res.send(myblogs);
})


app.post("/blog/create",authentication,async(req,res) => {
    const{title,author,category} = req.body;
    const userId = req.userID
    new_blog = await new BlogModel({
        title,
        author,
        category,
        userID : userId
    })
    new_blog.save();
    res.send("blog added successfully")
})

app.put("blog/update/:blogId", authentication, async(req,res) => {
    const blog_id = req.params;
    const updated_data = req.body;
    await BlogModel.findOneAndUpdate({"userId": userID, "_id": blog_id}, updated_data);
    res.send({msg: "blog updated successfully"})
})

app.delete("blog/delete/:blogId", authentication, async(req,res) => {
    const blog_id = req.params;
    await BlogModel.findOneAndDelete({"userId": userID, "_id": blog_id});
    res.send({msg: "blog updated successfully"})
})


app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to db successfully")
    } catch (error) {
        console.log("Failed to connect to the db");
        console.log(error);
    }
})

