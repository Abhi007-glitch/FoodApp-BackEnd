
const express = require("express");
const userRouter = express.Router();
const {protectRoute} = require("../controller/authController");

const {getAllUsersController,profileController} = require("../controller/userController");

   userRouter.get("/",getAllUsersController)

   userRouter.get("/proflie",protectRoute,profileController)


   module.exports = userRouter;