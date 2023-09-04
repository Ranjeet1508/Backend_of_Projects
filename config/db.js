const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    city : {type:String, required:true},
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required:true}
})

const blogSchema = mongoose.Schema({
    title : {type:String, required:true},
    author : {type:String, required:true},
    category : {type: String, required:true},
    userID: {type: String, required: true}
})


const UserModel = mongoose.model("user",userSchema);
const BlogModel = mongoose.model("blog",blogSchema);


const connection = mongoose.connect(process.env.MONGO_URL);

module.exports = {
    connection,
    BlogModel,
    UserModel
}