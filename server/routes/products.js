const express=require('express');
const{Product}=require('../models/products.js');
const{RecentlyViewed}=require('../models/recentlyViewed.js');
const {Category}=require('../models/category.js');
const router=express.Router();
const pLimit=require('p-limit');
const cloudinary=require('cloudinary').v2

const multer  = require('multer')
const fs=require("fs");

var imagesArr=[];
var productEditId;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })

  const upload = multer({ storage: storage })

  router.post('/upload',upload.array("images"),async(req,res)=>{
    let images;
    if(productEditId!==undefined){
       const product=await Product.findById(productEditId);
       if(product){
        images=product?.images;
       }
       
       if(images?.length!==0){
          for(image of images){
             fs.unlinkSync(`uploads/${image}`);
          } productEditId="";
       }
    // if (images && images.length !== 0) {
    //     for (const image of images) {
    //         const imagePath = `uploads/${image}`;
    //         if (fs.existsSync(imagePath)) {
    //             fs.unlinkSync(imagePath);
    //         }
    //         productEditId="";
    //     }
    // }
    }
 
     imagesArr=[];
     const files=req.files;
     for(let i=0;i<files.length;i++){
         imagesArr.push(files[i].filename);
     }
     // console.log(imagesArr);
     res.send(imagesArr);    
 });
 



router.get('/',async(req,res)=>{



    const page=parseInt(req.query.page) || 1;
      const perPage=parseInt(req.query.perPage);
      const totalPosts=await Product.countDocuments();
      const totalPages= Math.ceil(totalPosts / perPage);

      if(page>totalPages){
        return res.status(404).json({message:"Page not found"})
     }

     let productList=[];

     if(req.query.minPrice !== undefined && req.query.maxPrice !== undefined){
        productList=await Product.find({subCatId:req.query.subCatId}).populate("category subCat");

        const filteredProducts=productList.filter(product =>{
            if(req.query.minPrice && product.price < parseInt(+req.query.minPrice)){
                return false;
            }
            if(req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)){
                return false;
            }
            return true;
        });

        if(!productList){
            res.status(500).json({success:false})
        }
        return res.status(200).json({
            "products":filteredProducts,
            "totalPages":totalPages,
            "page":page
      
          });

     }
     else if(req.query.page !== undefined && req.query.perPage !== undefined){
        productList=await Product.find(req.query).populate("category subCat").skip((page-1)*perPage)
              .limit(perPage)
              .exec();
              if(!productList){
                res.status(500).json({success:false})
            }
            return res.status(200).json({
                "products":productList,
                "totalPages":totalPages,
                "page":page
        
            });

     }
     else{
        productList=await Product.find(req.query).populate("category subCat");

        if(!productList){
            res.status(500).json({success:false})
        }
        return res.status(200).json({
            "products":productList,
            "totalPages":totalPages,
            "page":page
    
        });

     }
     

    //  if(req.query.catName !== undefined){
    //     productList=await Product.find({catName:req.query.catName}).populate("category subCat")
    //  } else{
    //     productList= await Product.find().populate("category subCat")
    //     .skip((page - 1)*perPage)
    //     .limit(perPage)
    //     .exec();
    //  }
     
    //  if(req.query.subCatId !== undefined){
    //     productList=await Product.find({subCatId:req.query.subCatId}).populate("category subCat")
    //  } else{
    //     productList= await Product.find().populate("category subCat")
    //     .skip((page - 1)*perPage)
    //     .limit(perPage)
    //     .exec();
    //  }




      
    res.send(productList);
});
router.get('/featured',async(req,res)=>{

    const productList= await Product.find({isFeatured:true});
    if(!productList){
        res.status(500).json({success:false})
    }
    return res.status(200).json(productList)

});

router.get('/recentlyViewed',async(req,res)=>{
    let productList=[];

    productList=await RecentlyViewed.find(req.query).populate("category subCat");

    if(!productList){
        res.status(500).json({success:false})
    }
    return res.status(200).json(productList);

 })
router.get('/:id',async(req,res)=>{
    productEditId=req.params.id;
    const product=await Product.findById(req.params.id);
    if(!product){
      return res.status(500).json({message:"The product with the given ID was not found."})
    } 
    return res.status(200).send(product);
 });



 router.post('/recentlyViewed',async (req,res)=>{

    let findProduct= await RecentlyViewed.find({prodId:req.body.id});

    var product;

    if(findProduct.length===0){

        product= new RecentlyViewed({
            prodId:req.body.id,
            name:req.body.name,
            subCat:req.body.subCat,
            description:req.body.description,
            images:req.body.images, //images:images_Array
            brand:req.body.brand,
            price:req.body.price,
            oldPrice:req.body.oldPrice,
            catName:req.body.catName,
            subCatId:req.body.subCatId,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            isFeatured:req.body.isFeatured,
            discount:req.body.discount,
            productRAMS:req.body.productRAMS,
            productSIZE:req.body.productSIZE,
            productWEIGHT:req.body.productWEIGHT,
        });

            product=await product.save();
            if(!product){
                res.status(500).json({
                    error:err,
                    success:false
                })
            }
            imagesArr=[];
            res.status(201).json(product);
    
    
       
    }

    
 })

router.post('/create',async (req,res)=>{
    
    const category=await Category.findById(req.body.category);
    if(!category){
        return res.status(404).send("Invalid Category");
    }
//cloudinary ki  ,vadu ippudu chupinchudu
    // const images_Array=[];
    // const uploadedImages= await  ImageUpload.find();

    // const images_Arr=uploadedImages?.map((item)=>{
    //     item.images?.map((image)=>{
    //         images_Array.push(image);
    //     })
    // })
         
    let product= new Product({
        name:req.body.name,
        subCat:req.body.subCat,
        description:req.body.description,
        images:imagesArr, //images:images_Array
        brand:req.body.brand,
        price:req.body.price,
        oldPrice:req.body.oldPrice,
        catName:req.body.catName,
        subCatId:req.body.subCatId,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
        discount:req.body.discount,
        productRAMS:req.body.productRAMS,
        productSIZE:req.body.productSIZE,
        productWEIGHT:req.body.productWEIGHT,

    });
    product=await product.save();
    if(!product){
        res.status(500).json({
            error:err,
            success:false
        })
    }
    res.status(201).json(product);
});


router.delete('/:id',async(req,res)=>{

      const product=await Product.findById(req.params.id);
      const images=product.images;

    //   if(images.length!==0){
    //      for(img of images){
    //         fs.unlinkSync(`uploads/${img}`);
    //      }
    //   }
    if (images && images.length !== 0) {
        for (const img of images) {
          const imagePath = `uploads/${img}`;
          // Check if the file exists before deleting
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          } else {
            console.warn(`Image file not found: ${imagePath}`);
          }
        }
      }

        const deleteProduct=await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
            return res.status(404).json({
                message:"product not found",
                status:false
            })
        }
        res.status(200).send({
            message:"Product is Deleted!",
            status:true
        })
});

router.put('/:id',async(req,res)=>{
    
    
    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            subCat:req.body.subCat,
        description:req.body.description,
        images:req.body.images,
        brand:req.body.brand,
        price:req.body.price,
        oldPrice:req.body.oldPrice,
        catName:req.body.catName,
        subCatId:req.body.subCatId,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
        discount:req.body.discount,
        productRAMS:req.body.productRAMS,
        productSIZE:req.body.productSIZE,
        productWEIGHT:req.body.productWEIGHT,

        },
        {new:true}

    );

    if(!product){
        res.status(404).json({
            message:"The product can not be Updated !",
            status:false
        })
    }
    res.status(200).json({
        message:"Product is updated",
        status:true
    });
    imagesArr=[];
    res.send(product);
})


module.exports=router;  