const express = require("express");
const planRouter = express.Router(); /// used to make routes developer friendly and also following good practices rules

const { getAllplansController,
    createPlanController,
    updatePlanController,
    deletePlanController,
    getPlanController
} =require('../controller/planController');

planRouter.route('/').get(getAllplansController).post(createPlanController); // same as seprate get and post request on '/' route 


planRouter.route("/:planRoutes").get(getPlanController)
                                .patch(updatePlanController)
                                .delete(deletePlanController);

module.exports = planRouter;