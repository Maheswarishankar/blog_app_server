const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken.js")


//Register..............................................................
const registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        //validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all fields"
            })
        }

        //exisiting user
        const exisitingUser = await userModel.findOne({ email });

        if (exisitingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exisits"
            })
        }

        //password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //save new user & token generated
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save();
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            success: true,
            message: "New User Created Successfully!!!", user

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Register function"
        })

    }
}

// Get all user.............................................................

const getAllusers = async (req, res) => {

    try {
        const users = await userModel.find({});
        return res.status(200).json({
            userCount: users.length,
            success: true,
            message: "Get all users successfully!!!",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Somthing Went Wrong"
        })
    }

}

//Login............................................................

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Please provide email or password",
            });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email not Registered",

            })
        }
        //password comparing

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            })
        }
        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            success: true,
            message: "Login Successfully!!!", user
        });


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Login Function"
        })

    }
}



module.exports = { registerController, getAllusers, loginController }