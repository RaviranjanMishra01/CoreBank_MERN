const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")

const router = express.Router()


/*
    - POST /API/ACCOUNTS
    -CREATE A NEW ACCOUNT
    - PROTECTED ROUTES
*/

router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)

module.exports = router;