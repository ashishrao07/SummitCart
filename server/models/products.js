const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {

        type:[String],
        required:true
    }
],
  
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0,
    },
    oldPrice:{
        type:Number,
        default:0,
    },
    catName:{
        type:String,
        default:''
    },
    subCatId:{
        type:String,
        default:''
    },
    
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    subCat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    countInStock:{
        type:Number,
        required:true
    },
    rating :{
        type:Number,
        default:0,
    },
    
    isFeatured:{
        type:Boolean,
        default:false,
    },
    discount:{
        type:Number,
        default:0,
    },
    productRAMS:[
        {
            type:String,
            default:null
    
        }
    ],
    productSIZE:[
        {
            type:String,
            default:null
    
        }
    ],
    productWEIGHT:[
        {
            type:String,
            default:null
    
        }
    ],
    dateCreated:{
        type:Date,
        default:Date.now,
    },
});

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
productSchema.set('toJSON',{
    virtuals:true,
});
exports.Product=mongoose.model('Product',productSchema);
