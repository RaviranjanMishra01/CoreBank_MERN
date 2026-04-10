const userModel = require("../models/user.model")
const JWT = require("jsonwebtoken")
const emailService = require("../services/email.service")

async function userRegisterController(req, res) {

    const { email, password, name } = req.body;

    const isExists = await userModel.findOne({ email: email })
    if (isExists) {
        return res.status(422).json({
            message: "User already exists with email",
            status: "false"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5d" })
    res.cookie("token", token)

    res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name
    }, token)

    await emailService.sendRegistrationEmail(user.email, user.name)
}

/* 
     post login
    /api/auth/login 
*/
async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "5d" })
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        }, token
    })
}


module.exports = {
    userRegisterController,
    userLoginController,
}