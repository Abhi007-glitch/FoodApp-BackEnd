const FoodplanModel = require("../model/planModel");


// ,
// ,
// ,
// ,
// 


async function getAllplansController(req,res){

  try{
    
    let data = await FoodplanModel.find().populate("reviews");
    if (data)
    {
      res.status(200).json({result:"Sent all data", AllPlans: data});
    }
    
  }
  catch(err)
  {
    console.log(err);
     res.status(500).json({"result":err.message});
  }

}

async function createPlanController(req,res)
{
  console.log(req.body);
  try{
   let planObjData = req.body;
 
   const isDataPresent = Object.keys(planObjData).length>0;
   if (isDataPresent)
   {
      let newPlan = await FoodplanModel.create(planObjData);
      res.status(200).json({result:"plan created",plan:newPlan});
   }
   else{
    res.status(404).json({message:"data is incomplete"});
   }
  }
  catch(err)
  {
    console.log(err.message);
    res.status(500).json({result:err.message});
  }
}

async function updatePlanController(req,res)
{
 try{
  let data = req.body;
  let id = req.params.planRoutes;

  let isDataPresent = Object.keys(data).length>0;
  if (isDataPresent)
  {  

    let plan = await FoodplanModel.findById(id);
    for (let key in data)
    {
       plan[key]=data[key];
    }
    await plan.save(); //saving updated data to database
    
    res.status(200).json({result:"plan Updated",updatedPlan:plan});
  }
  else
  {
    res.status(404).json({result:"Enter value of the updated plan, nothing to update"})
  }


 }catch(err)
 {
    console.log(err);
    res.status(500).json({result:err.message});
 }
}

async function deletePlanController(req,res)
{

}

async function getPlanController(req,res)
{
 try{
  let id = req.params.planRoutes;
  let plan = await FoodplanModel.findById(id).populate("reviews");
  res.status(200).json({result:"plan Found",plan:plan});
  
 }
 catch(err)
 {
  console.log(err);
  res.status(500).json({err:err.message});
 }
}


module.exports={
  getPlanController,
  deletePlanController,
  updatePlanController,
  createPlanController,
  getAllplansController

}

