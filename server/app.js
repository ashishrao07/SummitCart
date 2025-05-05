const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv/config');
const authJwt=require('./helper/jwt')

app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());

//routes

const categoryRoutes=require('./routes/categories');
const subCatRoutes=require('./routes/subCat');
const productRoutes=require('./routes/products');
const productWeightRoutes= require('./routes/productWeight');
// const imageUploadRoutes=require('./helper/imageUpload.js');
const userRoutes=require('./routes/user');
const cart=require('./routes/cart');
const checkoutSchema=require('./routes/checkout');


app.use("/api/user",userRoutes);
app.use('/api/productWeight',productRoutes);
app.use('/uploads',express.static("uploads"));
app.use('/api/category',categoryRoutes)
app.use('/api/subCat',subCatRoutes)
app.use('/api/products',productRoutes);
// app.use('/api/imageUpload',imageUploadRoutes);
app.use('/api/productWeight',productWeightRoutes);
app.use('/api/cart',cart);
app.use('/api/checkout',checkoutSchema);

// Error handler middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ status: false, msg: 'Invalid token or no token provided' });
    }
    
    // Handle other errors
    console.error(err);
    res.status(500).json({ status: false, msg: 'Internal server error' });
  });
  

//DataBase
mongoose.connect(process.env.CONNECTION_STRING,{
    // useNewUrlParser:true,
    // useunifiedTopology:true
})
.then((err)=>{
    console.log("Database Connection is Ready!");
    //server
    app.listen(process.env.PORT,()=>{
     console.log(`Server is running hhtp://localhost:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})
