const express = require("express");
const reviewRouter = express.Router(); /// used to make routes developer friendly and also following good practices rules

const { createReviewController, getAllReviewController
} =require('../controller/reviewController');

reviewRouter.route('/').get(getAllReviewController).post(createReviewController); // same as seprate get and post request on '/' route 




module.exports = reviewRouter;