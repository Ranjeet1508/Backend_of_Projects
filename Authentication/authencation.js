const jwt = require("jsonwebtoken");
require('dotenv').config();




const authentication = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY , function(err, decoded) {
        if(err){
            return res.send({msg: "token doesn't verify" , err})
        }
        const {userID} = decoded;
        req.userID = userID;
        next();
      });
}

module.exports = {
    authentication
}