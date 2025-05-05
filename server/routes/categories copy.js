




 const {Category}=require('../models/category');
 const express=require('express');
 const router=express.Router();
 const pLimit=require('p-limit');
const cloudinary=require('cloudinary').v2;


cloudinary.config({
cloud_name:process.env.cloudinary_Config_Cloud_Name,
api_key: process.env.cloudinary_Config_api_key,
api_secret:process.env.cloudinary_Config_api_secret,
})


const multer  = require('multer')
const fs=require("fs");
const { ImageUpload } = require('../models/imageUploads');

var imagesArr=[];
var categoryEditId;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })

  const upload = multer({ storage: storage })

router.post('/create', upload.array("images"), async (req, res) => {
   try {
      const imagesArr = [];
       // Check if files exist in the request
       if (!req.files || req.files.length === 0) {
         return res.status(400).json({ error: 'No files were uploaded' });
      }

      for (let i = 0; i < req.files.length; i++) {
         const result = await cloudinary.uploader.upload(req.files[i].path, {
            use_filename: true,
            unique_filename: false,
            overwrite: false
         });
         imagesArr.push(result.secure_url);
         fs.unlinkSync(req.files[i].path); // delete local copy
      }

      const category = new Category({
         name: req.body.name,
         images: imagesArr,
         color: req.body.color
      });

      await category.save();
      res.status(201).json(category);

   } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to create category" });
   }
});




 router.get('/',async(req,res)=>{
   try{

      const page=parseInt(req.query.page) || 1;
      const perPage=6;
      const totalPosts=await Category.countDocuments();
      const totalPages= Math.ceil(totalPosts / perPage);
   
      if(page>totalPages){
         return res.status(404).json({message:"No Data found"})
      }

      const categoryList= await Category.find()
           .skip((page - 1)*perPage)
           .limit(perPage)
           .exec();
   
    if(!categoryList){
        res.status(500).json({success:false})
    }
   //  res.send(categoryList)
    return res.status(200).json({
      "categoryList":categoryList,
      "totalPages":totalPages,
      "page":page

    });

   }catch(error){
      res.status(500).json({success:false})
   }
 })

router.get('/:id',async(req,res)=>{

    categoryEditId=req.params.id;

   const category=await Category.findById(req.params.id);
   if(!category){
      res.status(500).json({message:"The category with the given ID was not found."})
   } 
   return res.status(200).send(category);
})

 router.post('/create',async(req,res)=>{
//     const limit=pLimit(2);

//     const imagesToUpload=req.body.images.map((image)=>{
//         return limit(async()=>{
//             const result=await cloudinary.uploader.upload(image);
//             return result;
//         })
        
        
//     });
//     const uploadStatus=await Promise.all(imagesToUpload);
//  const imgurl=uploadStatus.map((item)=>{
//     return item.secure_url;
//  })

//  if(!uploadStatus){
//     return res.status(500).json({
//         error:"image cannot upload",
//         status:false
//     })
//  }
 let category=new Category({
    name:req.body.name,
    images:imagesArr,
    color:req.body.color
 });
 if(!category){
    req.status(500).json({
        error:err,
        success:false
    })
 }
category=await category.save();
res.status(201).json(category);
});
 
router.delete('/:id',async(req,res)=>{
   const category=await Category.findById(req.params.id);
      const images=category.images;

      if(images.length!==0){
         for(img of images){
            fs.unlinkSync(`uploads/${img}`);
         }
      }


   const deletedUser=await Category.findByIdAndDelete(req.params.id);

   if(!deletedUser){
      res.status(404).json({
         message:"Category not found",
         success:false
      })
   
   }
   res.status(200).json({
      success:true,
      message:"category deleted"
   })
});

 

router.put('/:id', upload.array("images"), async (req, res) => {
   try {
      const imagesArr = [];

      for (let i = 0; i < req.files.length; i++) {
         const result = await cloudinary.uploader.upload(req.files[i].path, {
            use_filename: true,
            unique_filename: false,
            overwrite: false
         });
         imagesArr.push(result.secure_url);
         fs.unlinkSync(req.files[i].path);
      }

      const category = await Category.findByIdAndUpdate(req.params.id, {
         name: req.body.name,
         images: imagesArr,
         color: req.body.color
      }, { new: true });

      if (!category) {
         return res.status(500).json({ message: "Category cannot be updated", success: false });
      }

      res.send(category);
   } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Update failed" });
   }
});


 module.exports=router;


