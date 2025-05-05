const express=require('express');
const router=express.Router();
const {subCategory}=require('../models/subCat');
const { json } = require('body-parser');


router.get('/',async(req,res)=>{
    try{
 
       const page=parseInt(req.query.page) || 1;
       const perPage=req.query.perPage;
       const totalPosts=await subCategory.countDocuments();
       const totalPages= Math.ceil(totalPosts / perPage);
       
       let subCategoryList=[];

       if(page>totalPages){
          return res.status(404).json({message:"No Data found"})
       }
       if(req.query.page !== undefined && req.query.perPage !== undefined){
          subCategoryList= await subCategory.find().populate("category")
         .skip((page - 1)*perPage)
         .limit(perPage)
         .exec();
       }else{
         subCategoryList= await subCategory.find().populate("category")
        
       }
 
    
     if(!subCategoryList){
         res.status(500).json({success:false})
     }
    //  res.send(categoryList)
     return res.status(200).json({
       "subCategoryList":subCategoryList,
       "totalPages":totalPages,
       "page":page
 
     });
 
    }catch(error){
       res.status(500).json({success:false})
    }
  })

  router.get('/:id',async(req,res)=>{

   const subCat=await subCategory.findById(req.params.id).populate("category");
   if(!subCat){
      res.status(500).json({message:"The sub category with the given ID was not found."})
   } 
   return res.status(200).send(subCat);
});

router.post('/create',async(req,res)=>{

let subCat=new subCategory({
    category:req.body.category,
    subCat:req.body.subCat,
 
 });
 if(!subCat){
    req.status(500).json({
        error:err,
        success:false
    })
 }
 subCat=await subCat.save();
res.status(201).json(subCat);
});

router.delete('/:id',async(req,res)=>{
    const subCat=await subCategory.findById(req.params.id);
    
    const deletedSubCat=await subCategory.findByIdAndDelete(req.params.id);
 
    if(!deletedSubCat){
       res.status(404).json({
          message:"Sub Category not found",
          success:false
       })
    
    }
    res.status(200).json({
       success:true,
       message:"Sub category deleted"
    })
 });

 router.put('/:id',async(req,res)=>{
    const subCat=await  subCategory.findByIdAndUpdate(req.params.id,{
        category:req.body.category,
        subCat:req.body.subCat,
        
      },{new:true})
      
      if(!subCat){
        return res.status(500).json({
            message:'Sub Category cannot be updated!',
            success:false
        })
     }
     res.send(subCat);
     
      });

  module.exports=router;