
const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRETKEY,{
        expiresIn: "7d"
    })
}

module.exports = generateToken