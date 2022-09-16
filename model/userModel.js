const mongoose = require('mongoose');

 let dblink = process.env.DB_LINK || require("../secret").DB_LINK;
 
 
 
 mongoose.connect(dblink).then(function () { //connecting to database server
        console.log("connected");
    }).catch(function (err) {
        console.log("error", err);
    })

// Schema - set of rules to be followed in order perform CURD opertation over collection/Model;
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Not valid"]
    },
    password:{
       type:String,
       required:[true,"Password is missing "]
    },
    confirmPassword:{
        type:"String",
        required:[true,"ConfirmPassword is missing"],
        //defining custom validators
        validate:{
              validator: function(){
                return this.password==this.confirmPassword;
              },
              message:"password miss match"
        }
    },
    email:{
        type:String,
        required:[true,"email is missing"],
        unique:true
    },
    phonenumber: {
        type: "String",
        minLength: [10,"less than 10 number"],
        maxLength: [10,"more than 10 number"]
    },
    pic: {
        type: String,
        default: "dp.png"
    },
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date
    },
    address: {
        type: String,
    }
})


const FoodUserModel = mongoose.model('FoodUserModel',userSchema); // creating model/collection using Schema define above
module.exports = FoodUserModel;