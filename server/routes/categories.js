const {Category}=require('../models/category');
 const express=require('express');
 const router=express.Router();
 const pLimit=require('p-limit');
const cloudinary=require('cloudinary').v2;

cloudinary.config({
cloud_name:process.env.cloudinary_Config_Cloud_Name,
api_key: process.env.cloudinary_Config_api_key,
api_secret:process.env.cloudinary_Config_api_secret,
secure:true
})


const multer  = require('multer')
const fs=require("fs");
const { ImageUpload } = require('../models/imageUpload');
const { error } = require('console');

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

// router.post('/upload',upload.array("images"),async(req,res)=>{
//     imagesArr=[];
//     try {
//       for (let i = 0; i < req.files.length; i++) {
//          const options = {
//             use_filename: true,
//             unique_filename: false,
//             overwrite: false,
//          };

//          const img = await cloudinary.uploader.upload(req.files[i].path, options,
//             function(error,result){
//                imagesArr.push(result.secure_url);
//                fs.unlinkSync(`uploads/${req.files[i].filename}`);
//             });
         
       
//       }
//       let imagesUploaded=new ImageUpload({
//          images:imagesArr,
//       });
//       imagesUploaded=await imagesUploaded.save();
//       return res.status(200).json(imagesArr);
   
//    }catch(error){
//       console.log(error);
//    }

   
// });

router.post("/upload", upload.array("images"), async (req, res) => {
   imagesArr = []
   try {
     if (!req.files || req.files.length === 0) {
       return res.status(400).json({
         success: false,
         message: "No files uploaded",
       })
     }
 
     for (let i = 0; i < req.files.length; i++) {
       const options = {
         use_filename: true,
         unique_filename: false,
         overwrite: false,
       }
 
       try {
         const result = await cloudinary.uploader.upload(req.files[i].path, options)
 
         imagesArr.push(result.secure_url)
 
         // Delete the file from local uploads folder
         fs.unlinkSync(`uploads/${req.files[i].filename}`)
       } catch (uploadError) {
         console.error("Error uploading to Cloudinary:", uploadError)
         // Continue with other images even if one fails
       }
     }
 
     // Save the uploaded images to the database
     if (imagesArr.length > 0) {
       let imagesUploaded = new ImageUpload({
         images: imagesArr,
       })
       imagesUploaded = await imagesUploaded.save()
     }
 
     return res.status(200).json({
       success: true,
       images: imagesArr,
     })
   } catch (error) {
     console.error("Error in upload route:", error)
     return res.status(500).json({
       success: false,
       message: "Error uploading images",
       error: error.message,
     })
   }
 })

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
// Delete image route
router.delete('/deleteImage', async (req, res) => {

  const imgUrl = req.body.img;
  const urlArr=imgUrl.split('/');
  const image= urlArr[urlArr.length-1];

  const imageName=image.split('.')[0];
  const response=await cloudinary.uploader.destroy(imageName,(error,result)=>{

  })
  if(response){
    res.status(200).send(response);
  }

  //  const { imageUrl } = req.body; // The URL of the image to delete

  //  if (!imageUrl) {
  //      return res.status(400).json({ message: 'No image URL provided.' });
  //  }

  //  try {
  //      // Assuming image is stored in the 'uploads' folder
  //      const imageFileName = imageUrl.split('/').pop(); // Extract filename from URL

  //      // Delete the image from the file system
  //      fs.unlinkSync(`uploads/${imageFileName}`);

  //      // Optionally, delete the image URL from the database (if it's linked to a Category)
  //      await Category.updateMany(
  //          { "images": imageUrl },
  //          { $pull: { images: imageUrl } }
  //      );

  //      // Send success response
  //      return res.status(200).json({ message: 'Image deleted successfully.' });
  //  } catch (error) {
  //      console.error('Error deleting image:', error);
  //      return res.status(500).json({ message: 'Error deleting image.' });
  //  }
});
 
router.delete('/:id',async(req,res)=>{
  const category=await Category.findById(req.params.id);
  const images=category.images;

  for(img of images){
    const imgUrl=img;
    const urlArr=imgUrl.split('/');
    const image=urlArr[urlArr.length-1];

    const imageName=image.split('.')[0];
    cloudinary.uploader.destroy(imageName,(error,result)=>{

    })
  }
  //  const category=await Category.findById(req.params.id);
      // const images=category.images;

      // if(images.length!==0){
      //    for(img of images){
      //       fs.unlinkSync(`uploads/${img}`);
      //    }
      // }


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

 

 router.put('/:id',async(req,res)=>{


            //    const limit=pLimit(2);

            //    const imagesToUpload=req.body.images.map((image)=>{
            //        return limit(async()=>{
            //            const result=await cloudinary.uploader.upload(image);
            //            return result;
            //        })
                  
            //    });
            //    const uploadStatus=await Promise.all(imagesToUpload);
            //  const imgurl=uploadStatus.map((item)=>{
            //     return item.secure_url;
            //  })

            //  if(!uploadStatus){
            //     return res.status(500).json({
            //         error:"image cannot upload",
            //         status:false
            //     })
            //  }
 const category=await  Category.findByIdAndUpdate(req.params.id,{
   name:req.body.name,
   images:req.body.images,
   color:req.body.color
 },{new:true})
 
 if(!category){
   return res.status(500).json({
       message:'Category cannot be updated!',
       success:false
   })
}
imagesArr=[];
res.send(category);

 });

 module.exports=router;



// const {Category}=require('../models/category');
//  const express=require('express');
//  const router=express.Router();
//  const pLimit=require('p-limit');
// const cloudinary=require('cloudinary').v2;

// cloudinary.config({
// cloud_name:process.env.cloudinary_Config_Cloud_Name,
// api_key: process.env.cloudinary_Config_api_key,
// api_secret:process.env.cloudinary_Config_api_secret,
// secure:true
// })


// const multer  = require('multer')
// const fs=require("fs");
// const { ImageUpload } = require('../models/imageUpload');

// var imagesArr=[];
// var categoryEditId;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads")
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     }
//   })

//   const upload = multer({ storage: storage })

// // router.post('/upload',upload.array("images"),async(req,res)=>{
// //     imagesArr=[];
// //     try {
// //       for (let i = 0; i < req.files.length; i++) {
// //          const options = {
// //             use_filename: true,
// //             unique_filename: false,
// //             overwrite: false,
// //          };

// //          const img = await cloudinary.uploader.upload(req.files[i].path, options,
// //             function(error,result){
// //                imagesArr.push(result.secure_url);
// //                fs.unlinkSync(`uploads/${req.files[i].filename}`);
// //             });
         
       
// //       }
// //       let imagesUploaded=new ImageUpload({
// //          images:imagesArr,
// //       });
// //       imagesUploaded=await imagesUploaded.save();
// //       return res.status(200).json(imagesArr);
   
// //    }catch(error){
// //       console.log(error);
// //    }

   
// // });

// router.post("/upload", upload.array("images"), async (req, res) => {
//    imagesArr = []
//    try {
//      if (!req.files || req.files.length === 0) {
//        return res.status(400).json({
//          success: false,
//          message: "No files uploaded",
//        })
//      }
 
//      for (let i = 0; i < req.files.length; i++) {
//        const options = {
//          use_filename: true,
//          unique_filename: false,
//          overwrite: false,
//        }
 
//        try {
//          const result = await cloudinary.uploader.upload(req.files[i].path, options)
 
//          imagesArr.push(result.secure_url)
 
//          // Delete the file from local uploads folder
//          fs.unlinkSync(`uploads/${req.files[i].filename}`)
//        } catch (uploadError) {
//          console.error("Error uploading to Cloudinary:", uploadError)
//          // Continue with other images even if one fails
//        }
//      }
 
//      // Save the uploaded images to the database
//      if (imagesArr.length > 0) {
//        let imagesUploaded = new ImageUpload({
//          images: imagesArr,
//        })
//        imagesUploaded = await imagesUploaded.save()
//      }
 
//      return res.status(200).json({
//        success: true,
//        images: imagesArr,
//      })
//    } catch (error) {
//      console.error("Error in upload route:", error)
//      return res.status(500).json({
//        success: false,
//        message: "Error uploading images",
//        error: error.message,
//      })
//    }
//  })

//  router.get('/',async(req,res)=>{
//    try{

//       const page=parseInt(req.query.page) || 1;
//       const perPage=6;
//       const totalPosts=await Category.countDocuments();
//       const totalPages= Math.ceil(totalPosts / perPage);
   
//       if(page>totalPages){
//          return res.status(404).json({message:"No Data found"})
//       }

//       const categoryList= await Category.find()
//            .skip((page - 1)*perPage)
//            .limit(perPage)
//            .exec();
   
//     if(!categoryList){
//         res.status(500).json({success:false})
//     }
//    //  res.send(categoryList)
//     return res.status(200).json({
//       "categoryList":categoryList,
//       "totalPages":totalPages,
//       "page":page

//     });

//    }catch(error){
//       res.status(500).json({success:false})
//    }
//  })

// router.get('/:id',async(req,res)=>{

//     categoryEditId=req.params.id;

//    const category=await Category.findById(req.params.id);
//    if(!category){
//       res.status(500).json({message:"The category with the given ID was not found."})
//    } 
//    return res.status(200).send(category);
// })

//  router.post('/create',async(req,res)=>{
// //     const limit=pLimit(2);

// //     const imagesToUpload=req.body.images.map((image)=>{
// //         return limit(async()=>{
// //             const result=await cloudinary.uploader.upload(image);
// //             return result;
// //         })
        
        
// //     });
// //     const uploadStatus=await Promise.all(imagesToUpload);
// //  const imgurl=uploadStatus.map((item)=>{
// //     return item.secure_url;
// //  })

// //  if(!uploadStatus){
// //     return res.status(500).json({
// //         error:"image cannot upload",
// //         status:false
// //     })
// //  }
//  let category=new Category({
//     name:req.body.name,
//     images:imagesArr,
//     color:req.body.color
//  });
//  if(!category){
//     req.status(500).json({
//         error:err,
//         success:false
//     })
//  }
// category=await category.save();
// res.status(201).json(category);
// });
// // Delete image route
// router.delete('/deleteImage', async (req, res) => {
//    const { imageUrl } = req.body; // The URL of the image to delete

//    if (!imageUrl) {
//        return res.status(400).json({ message: 'No image URL provided.' });
//    }

//    try {
//        // Assuming image is stored in the 'uploads' folder
//        const imageFileName = imageUrl.split('/').pop(); // Extract filename from URL

//        // Delete the image from the file system
//        fs.unlinkSync(`uploads/${imageFileName}`);

//        // Optionally, delete the image URL from the database (if it's linked to a Category)
//        await Category.updateMany(
//            { "images": imageUrl },
//            { $pull: { images: imageUrl } }
//        );

//        // Send success response
//        return res.status(200).json({ message: 'Image deleted successfully.' });
//    } catch (error) {
//        console.error('Error deleting image:', error);
//        return res.status(500).json({ message: 'Error deleting image.' });
//    }
// });
 
// router.delete('/:id',async(req,res)=>{
//    const category=await Category.findById(req.params.id);
//       const images=category.images;

//       if(images.length!==0){
//          for(img of images){
//             fs.unlinkSync(`uploads/${img}`);
//          }
//       }


//    const deletedUser=await Category.findByIdAndDelete(req.params.id);

//    if(!deletedUser){
//       res.status(404).json({
//          message:"Category not found",
//          success:false
//       })
   
//    }
//    res.status(200).json({
//       success:true,
//       message:"category deleted"
//    })
// });

 

//  router.put('/:id',async(req,res)=>{


//             //    const limit=pLimit(2);

//             //    const imagesToUpload=req.body.images.map((image)=>{
//             //        return limit(async()=>{
//             //            const result=await cloudinary.uploader.upload(image);
//             //            return result;
//             //        })
                  
//             //    });
//             //    const uploadStatus=await Promise.all(imagesToUpload);
//             //  const imgurl=uploadStatus.map((item)=>{
//             //     return item.secure_url;
//             //  })

//             //  if(!uploadStatus){
//             //     return res.status(500).json({
//             //         error:"image cannot upload",
//             //         status:false
//             //     })
//             //  }
//  const category=await  Category.findByIdAndUpdate(req.params.id,{
//    name:req.body.name,
//    images:imagesArr,
//    color:req.body.color
//  },{new:true})
 
//  if(!category){
//    return res.status(500).json({
//        message:'Category cannot be updated!',
//        success:false
//    })
// }
// res.send(category);

//  });

//  module.exports=router;


