const FoodUserModel = require("../model/userModel");


async function getAllUsersController(req,res){
    try{
       let users = await FoodUserModel.find();
       res.json(users);
    }
    catch(err){
       res.send(err.message);
    }
 }

 async function profileController(req,res){
  
    try{
      const userId = req.userId;
      const user = await FoodUserModel.findById(userId);
      res.json({
          data: user,
          message: "Data about logged in user is send"
      });
    }
    catch(err){
      res.send(err.message);
    }

}
function protectRoute(req,res,next){
   try{
      const cookies = req.cookies;
      const JWT = cookies.JWT;
      if (JWT)
      {
       console.log("Entered Protected Route");

       let token = jwt.verify(JWT,secrets.JWTSECRET);
       console.log(token);
       next();
      }
   }
   catch(err){
     if(err.message=="invalid signature")
     {
       res.send("TOken invalid kindly login");
     }
     else {
       res.send(err.message);
     }
   }
 }

module.exports = {profileController,getAllUsersController,protectRoute};
