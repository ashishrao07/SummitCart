
const {productWeight} =require("../models/productWEIGHT");
const express=require('express');
const router=express.Router();


router.get('/',async(req,res)=>{
    try{
        const productWeightList=await productWeight.find();
        if(!productList){
            res.status(500).json({success:false})
        }
        return res.status(200).json(productWeightList);
    }catch(error){
        res.status(500).json({success:false});
    }

    

});

router.post('/create',async(req,res)=>{
    let productWeight=new productWeight({
        name:req.body.name
    });

    if(!productWeight){
        res.status(500).json({
            error:err,
            success:false
        })
    }
    productWeight=await productWeight.save();
    res.status(201).json(productWeight);
});

router.delete('/:id',async(req,res)=>{
    const deleteItem=new productWeight.findByIdAndDelete(req.params.id);

    if(!deleteItem){
        res.status(404).json({
            msg:"Item Not Found!",
            success:false
        })
    }
    res.status(200).json({
        success:true,
        message:"Item Deleted!"
    })

});

router.put('/:id',async(req,res)=>{
    const item=new productWeight.findByIdAndUpdate(req.params.id,
        {
                name:req.body.name,
        },
        {new:true}   
    )
    if(!item){
        return res.status(500).json({
            message:"Item cannot be updated!",
            success:false
        })
    }
    res.send(item);
})

module.exports=router;  