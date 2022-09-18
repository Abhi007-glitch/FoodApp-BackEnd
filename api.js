const express = require("express");
const app = express();
var cors = require('cors');
const FoodUserModel = require("./model/userModel");
const ReviewModel = require("./model/reviewModel");
const PlanModel = require("./model/planModel");
// token name is -> JWT & mechanism -> cookies


const cookieParser = require("cookie-parser");
 
const userRouter =require('./routes/userRoutes');
const authRouter = require("./routes/authRoutes");
const planRouter = require("./routes/planRoutes");
const reviewRouter = require("./routes/reviewRoutes");

app.use(cors()); // to deal with cross origin resource sharing (CROS) issue
app.use(cookieParser());
app.use(express.json());// define which kind of data is accepted


app.use("/api/v1/user",userRouter);
app.use('/api/v1/auth',authRouter); // now authRouter will represent '/api/v1/auth'
app.use("/api/v1/plan",planRouter);
app.use("/api/v1/review",reviewRouter );





app.listen(process.env.PORT || 3000,()=>{
  console.log("listening at port 3000");
})











  //******************* Controller Functions  *************************/


     


//*********************************************************************************************************** */

 




//*****************************helper function  ****************************



  




