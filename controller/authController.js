const FoodUserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET ||require("../secret").JWTSECRET;
const mailSender = require("../utility/mailtest");

 async function signupController(req, res) {
    try {
        let data = req.body;
        console.log(data);
        // to create a document inside userModel
        let newUser = await FoodUserModel.create(data);
        console.log(newUser);
        res.status(200).json({result:"Signed-Up successfully"});
    } catch (err) {
        res.status(400).json({result:err.message});
    }
}

    async function loginController (req, res) {
      try{ 
              let {email,password} = req.body;
           
              // to create 

           if (email && password) 
           {
            let User = await FoodUserModel.findOne({"email":email});
            if (User)
            {
                if(User.password==password)
                {     
                    const token = jwt.sign({data:User["_id"],
                                            exp:Math.floor(Date.now()/1000)+(60*60*24)},secrets.JWTSECRET);

                    res.cookie("JWT",token);

                    // removing password and confirm password before sending user data to frontend 
                    User.password= undefined;
                    User.confirmPassword=undefined;
                    console.log("Login ",User);
                    res.status(200).json({User});
                }
                else 
                {   // password and Email does not match
                    res.status(400).json({result:"Re-check Your password and Email"});
                }

            }
            else 
            {   
              // user not found
                res.status(404).json({result:"user not found kindly signup found"});
            }
           }
           else 
           {  
            // Password or Email missing
              res.status(400).json({result:"Password or Email missing"});
           }  
             
             
      }
      catch(error)
      {
          res.status(500).json({result:error.message});
      }
      
      }


      async function forgetPasswordController (req,res){
        try{
          let email = req.body.email;
         
          let user = await FoodUserModel.findOne({email:email});
         console.log("ForgetPassWord ",user);
          if (user)
          {
            let otp = otpGenerator();
            let afterFiveMin = Date.now()+5*60*1000;
            user.otp=otp;
            user.otpExpiry=afterFiveMin;
          
            await mailSender(email,otp);
            await user.save();
            res.status(204).json( {data:user , result:"OTP sent to Your Email."})
          }
          else 
          {
            res.status(404).json({result:"User with this email not found"});
          }
         
     
        }
        catch(error)
        {
          res.status(500).json({result:error.message});
        }
      }


      async function resetPasswordController(req,res){
        try{
             let {email,otp,password,confirmPassword}= req.body;
    
             let user = await FoodUserModel.findOne({email});
             let currentTime = Date.now();
             if (currentTime>user.otpExipry)
             {
               user.otp=undefined;
               user.otpExpiry=undefined;
               await user.save();
               res.status(400).json({result:"otp Expired"})
             }
             else 
             { if (user.otp!=otp)
              {
                 res.status(400).json({result:"Wrong Otp"});
              }
              else
              {
                user = await FoodUserModel.findOneAndUpdate({otp},{password,confirmPassword,otp:undefined},{runValidators:true,new :true});
                console.log(user);
                user.otp=undefined;
                 user.otpExipry=undefined;
                 await user.save();
                 res.status(201).json({user:user,result:"Password Reset"});
              }
              
             }
            
        }
        catch(err)
        {
          res.status(500).json({result:err.message});
        }
      }

  function otpGenerator()
{
  return Math.floor(100000+Math.random()*900000);
}

function protectRoute(req,res,next){
  try{
     const cookies = req.cookies;
     const JWT = cookies.JWT;
     if (JWT)
     {
      console.log("Entered Protected Route");

      let token = jwt.verify(JWT,JWTSECRET);
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


module.exports ={signupController,loginController,protectRoute,resetPasswordController,otpGenerator,forgetPasswordController};