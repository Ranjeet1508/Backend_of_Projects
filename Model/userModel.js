const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true},
})
const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}