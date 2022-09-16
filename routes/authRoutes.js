
const express = require("express");
const authRouter = express.Router(); /// used to make routes developer friendly and also following good practices rules

const {signupController,loginController,forgetPasswordController,resetPasswordController}  = require("../controller/authController");

authRouter.post("/signup", signupController);

authRouter.post("/login",loginController );



authRouter.patch('/forgetPassword',forgetPasswordController);


authRouter.patch('/resetPassword',resetPasswordController);


module.exports = authRouter;