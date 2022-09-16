let mongoose = require("mongoose");

let reviewModel = mongoose.Schema(
    {
        
      rating:{
       type:Number,
       min:1,
       max:5,
       required:[true,"Review without rating not accepted."]
      },
      description:{
        type:String,
        required:[true,"Review can't be empty."]
      },
      createdAt:{
        type:Date,
        default:Date.now
      },
      user:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Review must belong to a registered user."],
        ref:"FoodUserModel"
      },
      plan:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Review must be on a registered Product"],
        ref:"FoodplanModel"
      }
      
        
    }
);

const ReviewModel = mongoose.model('FoodreviewModel',reviewModel);
module.exports = ReviewModel;