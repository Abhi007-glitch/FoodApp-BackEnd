
const reviewModel= require("../model/reviewModel");
const planModel= require("../model/planModel");

async function createReviewController(req,res){
    let review = req.body;
    
    try{
      newReview = await ReviewModel.create(review);
     let reviewId= newReview['_id'];
     let currentPlan = await PlanModel.findById(review.plan);
     currentPlan.reviews.push(reviewId);
 
     // updating averaging rating 
     let rating = newReview.rating;
     let totalNumberOfReview = currentPlan['reviews'].length;
     if (totalNumberOfReview>1)
     {
       console.log(rating, totalNumberOfReview);
     
       currentPlan.averageRating = (currentPlan.averageRating * (totalNumberOfReview-1))/totalNumberOfReview + rating/totalNumberOfReview;
 
     }
     else 
     {
       currentPlan.averageRating=rating;
     }
    
 
 
     await currentPlan.save();
 
 
 
      res.status(201).json({message:"new review created" ,review:newReview});
    }
    catch(err){
     console.log(err.message);
     res.status(500).json({message:err.message});
    }
 
 }

 async function getAllReviewController(req,res){
    //populate - expand 
    try{
      let reviews = await ReviewModel.find().populate({path:"user",select:"name pic"}).populate({path:"plan",select:"name price"}); // select operation syntax in mongoDB
      res.status(200).json({reviews,message:"all review sent"});
    }
    catch(err)
    {
      res.status(500).json({message:err.message});
    }
  
  }

  module.exports= {createReviewController,getAllReviewController};