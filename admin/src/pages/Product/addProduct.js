import React, { useContext, useEffect, useRef, useState } from "react";
import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize , styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Rating from '@mui/material/Rating';
import { Button, CssVarsProvider } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { fetchDataFromApi, postData } from "../../utils/api";
import { Mycontext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineCloudUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';



const StyledBreadcrumb =styled(Chip)(({theme})=>{
    const backgroundColor=
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

    return{
        backgroundColor,
        height: theme.spacing(3),
        color:theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus':{
            backgroundColor:emphasize(backgroundColor,0.06),

        },
        '&:active':{
            boxShadow:theme.shadows[1],
            backgroundColor:emphasize(backgroundColor,0.12),
        }
    }
})

const ITEM_HEIGHT =48;
const ITEM_PADDING_TOP=8;

const MenuProps= {
    PaperProps :{
        style:{
            maxHeight:ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width:250,
        },
    },
};

const ProductUpload=()=>{
    const [categoryVal,setcategoryVal] = useState('');
    const [subCatVal,setSubCatVal] = useState('');
    const[ratingsValue,setRatingValue]=useState(4);
    const[productRams,setProductRams]=useState([]);
    const[productWeight,setProductWeight]=useState([]);
    const[productSize,setProductSize]=useState([]);
    const[isFeaturedValue,setisFeaturedValue]=useState('');


    const [catData,setCatData]=useState([]); //for setting the category values (it is already defined in category.js)
    const[productImagesArr,setProductImagesArr]=useState([]);
    const[files,setFiles]=useState([]);
    const[imgFiles,setImgFiles]=useState();
    const[previews,setPreviews]=useState();
    const[isSelectedFiles,setIsSelectedFiles]=useState(false);
    const [formFields,setFormFields]=useState({
        name:"",
        description:'',
        images:[],
        brand:'',
        price:null,
        oldPrice:null,
        catName:'',
        subCatId:'',
        category:'',
        countInStock:null,
        rating:0,
        isFeatured:null,
        discount:0,
        productRAMS:[],
        productSIZE:[],
        productWEIGHT:[],


    });
    const[isLoading,setIsLoading]=useState(false);
    
    const context=useContext(Mycontext);
    const fd=new FormData();

    const history=useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0);
        setCatData(context.catData);
       
      }, []);

      useEffect(()=>{
        if(!imgFiles) return;
        let tmp=[];
        for(let i=0;i<files.length;i++){
            tmp.push(URL.createObjectURL(files[i]));
        }

        const objectUrls=tmp;
        setPreviews(objectUrls);

        //free memory
        for(let i=0;i<objectUrls.length;i++){
            return ()=>{
                URL.revokeObjectURL(objectUrls[i])
            }
        }
      },[imgFiles])

  const handleChangeCategory = (event) => {
    setcategoryVal(event.target.value);
    setFormFields(()=>({
        ...formFields,
        category:event.target.value,
    }))
     
  };

  const handleChangeSubCategory = (event) => {
    setSubCatVal(event.target.value);
    setFormFields(()=>({
        ...formFields,
        subCat:event.target.value,
    }))
    formFields.subCatId=event.target.value;
     
  };
  const handleChangeisFeaturedValue = (event) => {
    setisFeaturedValue(event.target.value);
    setFormFields(()=>({
        ...formFields,
        isFeatured:event.target.value,
    }))
  };

  

  const handleChangeProductRams=(e)=>{
    //   setProductRams(e.target.value);
      setFormFields(()=>({
        ...formFields,
        productRAMS:e.target.value
      }))
    const {
        target: { value },
      } = e;
      setProductRams(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  }

  const handleChangeProductWeight=(e)=>{
    // setProductWeight(e.target.value);
    setFormFields(()=>({
      ...formFields,
      productWEIGHT:e.target.value
    }))
    const {
        target: { value },
      } = e;
      setProductWeight(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

}
const handleChangeProductSize=(e)=>{
    // setProductSize(e.target.value);
    setFormFields(()=>({
      ...formFields,
      productSIZE:e.target.value
    }))
    const {
        target: { value },
      } = e;
      setProductSize(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
}
  const productImages=useRef();
  

   const inputChange=(e)=>{
    setFormFields(()=>({
        ...formFields,
        [e.target.name]:e.target.value,
    }))
       
   }
//    const onChangeFile=async(e,apiEndPoint)=>{
//     try{
//         const imgArr=[];
//         const files=e.target.files;
//         setImgFiles(e.target.files);
//         for(var i=0;i<files.length;i++){
//             const file=files[i];
//             imgArr.push(file);
//             fd.append(`images`,file);
//         }
//         setFiles(imgArr);
//         postData(apiEndPoint,fd).then((res)=>{
//             console.log(res);
//     });
//     }catch(error){
//         console.log(error);
//     }
//   }


const onChangeFile=async(e,apiEndPoint)=>{
    try{
        const imgArr=[];
        const files=e.target.files;
        setImgFiles(e.target.files);
        for(var i=0;i<files.length;i++){

            //validate file type only mp3
            if(files[i] &&(files[i].type==='image/jpeg' || files[i].type==='image/png' || files[i].type==='image/jpg' || files[i].type==='image/webp')){
                setImgFiles(e.target.files)

                const file=files[i];
                imgArr.push(file);
                fd.append(`images`,file);
            
            
        
        setFiles(imgArr);
        context.setAlertBox({
            open:true,
            error:false,
            msg:"image uploaded suceesfully"
        });
        setIsSelectedFiles(true);
       
        postData(apiEndPoint,fd).then((res)=>{
            context.setAlertBox({
                open:true,
                color:'success',
                msg:"image uploaded suceesfully"
            });
    });

}else{
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please select a valid JPG or PNG file"
        });
    
}}
    }catch(error){
        console.log(error);
    }
  }

  const addProduct=(e)=>{   //submitting the form
    e.preventDefault();
   

    // formFields.images=productImagesArr;  //after submitting ,images anni update kavali ga
    fd.append('name',formFields.name);
    fd.append('subCat',formFields.subCat);
    fd.append('description',formFields.description);
    fd.append('brand',formFields.brand);
    fd.append('price',formFields.price);
    fd.append('oldPrice',formFields.oldPrice);
    fd.append('catName',formFields.catName);
    fd.append('subCatId',formFields.subCatId);
    fd.append('category',formFields.category);
    fd.append('countInStock',formFields.countInStock);
    fd.append('rating',formFields.rating);
    fd.append('isFeatured',formFields.isFeatured);
    fd.append('discount',formFields.discount);
    fd.append('productRAMS',formFields.productRAMS);
    fd.append('productSIZE',formFields.productSIZE);
    fd.append('productWEIGHT',formFields.productWEIGHT);


    // validations

        if(formFields.name===""){
           context.setAlertBox({
                open:true,
                msg:"Please add Product Name",
                error:true
            })
            return false; //error vasthey ,form submit kadhu
        }

       
        if(formFields.description===""){
            context.setAlertBox({
                open:true,
                msg:"Please add Product Description",
                error:true
            })
            return false;
        }
        if(formFields.brand===""){
            context.setAlertBox({
                open:true,
                msg:"Please add Product Brand",
                error:true
            })
            return false;
        }
        if(formFields.price===null){
            context.setAlertBox({
                open:true,
                msg:"Please add Product Price",
                error:true
            })
            return false;
        }
        if(formFields.oldPrice===null){
            context.setAlertBox({
                open:true,
                msg:"Please add old price",
                error:true
            })
            return false;
        }
        if(formFields.category===""){
            context.setAlertBox({
                open:true,
                msg:"Please select Product Category",
                error:true
            })
            return false;
        }
        if(formFields.subCat===""){
            context.setAlertBox({
                 open:true,
                 msg:"Please add Sub Category",
                 error:true
             })
             return false; //error vasthey ,form submit kadhu
         }
         
        if(formFields.countInStock===null){
            context.setAlertBox({
                open:true,
                msg:"Please add Product count in stock",
                error:true
            })
            return false;
        }
        if(formFields.rating===0){
            context. setAlertBox({
                open:true,
                msg:"Please add Product Rating",
                error:true
            })
            return false;
        }
        if(formFields.isFeatured===null){
            context. setAlertBox({
                open:true,
                msg:"Please select whether the product is featured or not",
                error:true
            })
            return false;
        }
        // if(formFields.images.length===0){
        //     context. setAlertBox({
        //         open:true,
        //         msg:"Please add atleast one product image",
        //         error:true
        //     })
        //     return false;
        // }
        
        setIsLoading(true);// Loading symbol  vasthadhi

    postData('/api/products/create',formFields).then((res)=>{   ///Data ni DB lo store
        context.setAlertBox({
            open:true,
            color:'success',
            msg:'The Product is Created'
        });
        setIsLoading(false);

        // setFormFields({      //once created ah fileds anni empty kavali kadha ,so anduke
        //     name:"",
        //     subCat:"",
        //     description:'',
        //     images:[],
        //     brand:'',
        //     price:0,
        //     oldPrice:0,
        //     category:'',
        //     countInStock:0,
        //     rating:0,
        //     isFeatured:false,
        // });
        // setProductImagesArr([]);   //once created ah fileds anni empty kavali kadha ,so anduke
        // setcategoryVal('');    //once created ah fileds anni empty kavali kadha ,so anduke
        // setisFeaturedValue(false);    //once created ah fileds anni empty kavali kadha ,so anduke

   history('/products');

    })
  }

 const selectCat=(cat)=>{
        formFields.catName=cat;
 }

 
    return(
        <>
        <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
           <h5 className="mb-0">Product Upload</h5>
           <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
                <StyledBreadcrumb
                   component='a'
                   href="#"
                   label='Dashboard'
                   icon={<HomeIcon fontSize="small" />}
               />
              <StyledBreadcrumb
                       component='a'
                       href="#"
                   label="Products" 
                //    deleteIcon={<ExpandMoreIcon />}
              />

           <StyledBreadcrumb
               component='a'
                href="#"
              label="Product Upload" 
            //   deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
        </div>

    <form className="form" onSubmit={addProduct}>
      <div className="row">
        <div className="col-sm-12">
            <div className="card p-4">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group pt-3">
                    <h6>PRODUCT NAME</h6>
                    <input type="text" name="name" value={formFields.name} onChange={inputChange}/>
                </div>
                <div className="form-group pt-3 ">
                    <h6>DESCRIPTION</h6>
                    <textarea placeholder="Type Here" rows={5} cols={10} value={formFields.description} name="description" onChange={inputChange}/>
                </div>
                
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                        <h6>CATEGORY</h6>
                        <Select
                            value={categoryVal}
                            onChange={handleChangeCategory}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}

                            className="w-100 "
                            >
                            <MenuItem value="">
                                <em value={null}>None</em>
                            </MenuItem>
                            {
                                context.catData?.categoryList?.length!==0 && context.catData?.categoryList?.map((cat,index)=>{
                                    return(
                                        <MenuItem value={cat.id} key={cat.id || index} onClick={()=>{
                                            selectCat(cat.name)
                                        }}>{cat.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                        <h6>SUB CATEGORY</h6>
                        <Select
                            value={subCatVal}
                            onChange={handleChangeSubCategory}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}

                            className="w-100 "
                            >
                            <MenuItem value="">
                                <em value={null}>None</em>
                            </MenuItem>
                            {
                                context.subCatData?.subCategoryList?.length!==0 && context.subCatData?.subCategoryList?.map((subCat,index)=>{
                                    return(
                                        <MenuItem value={subCat.id} key={subCat.id || index} >{subCat.subCat}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        </div>
                    </div>   


                    <div className="col">
                           <div className="form-group">
                        <h6>BRAND</h6>
                        <input type="text" name="brand" value={formFields.brand} onChange={inputChange}/>
                        </div>
                    </div> 
                </div>

         <div className="row">
                    <div className="col">
                            <div className="form-group">
                                <h6> PRICE</h6>
                                <input type="text" name="price" value={formFields.price} onChange={inputChange}/>
                            </div>
                     </div>

                        <div className="col">
                            <div className="form-group">
                                <h6>OLD PRICE</h6>
                                <input type="text" name="oldPrice" value={formFields.oldPrice} onChange={inputChange}/>
                            </div>
                        </div>   

                        <div className="col">
                                    <div className="form-group">
                                        <h6>PRODUCT STOCK</h6>
                                        <input type="text" name="countInStock" value={formFields.countInStock} onChange={inputChange}/>
                                    </div>
                               </div>  
          </div>
                  

              <div className="row">      
                    <div className="col-md-4">
                                <div className="form-group">
                                    <h6>IS FEATURED</h6>
                                    <Select 
                                    value={isFeaturedValue}
                                    onChange={handleChangeisFeaturedValue}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className="w-100"
                                    >
                                        <MenuItem value="">
                                                <em value={null}>None</em>
                                            </MenuItem>
                                            <MenuItem value={true}>True</MenuItem>
                                            <MenuItem value={false}>False</MenuItem>

                                    </Select>
                                </div>
                            </div> 

                    <div className="col">
                        <div className="form-group">
                        <h6>PRODUCT RAMS</h6>
                        <Select 
                                    value={productRams}
                                    onChange={handleChangeProductRams}
                                    displayEmpty
                                    multiple
                                    // inputProps={{ 'aria-label': 'Without label' }}

                                    MenuProps={MenuProps}
                                    className="w-100"
                                    >
                                        {/* <MenuItem value="">
                                                <em >None</em>
                                            </MenuItem> */}
                                            
                                            <MenuItem value={"6GB"}>6GB</MenuItem>
                                            <MenuItem value={"8GB"}>8GB</MenuItem>
                                            <MenuItem value={"12GB"}>12GB</MenuItem>

                         </Select>
                        </div>
                    </div>
                        


                         <div className="col-md-4">
                                    <div className="form-group">
                                        <h6>DISCOUNT</h6>
                                        <input type="text" name="discount" value={formFields.discount} onChange={inputChange}/>
                                    </div>
                         </div> 
                                                       
          </div>

          <div className="row">
                   
                    <div className="col">
                        <div className="form-group">
                        <h6>PRODUCT WEIGHT</h6>
                        <Select 
                                    value={productWeight}
                                    onChange={handleChangeProductWeight}
                                    displayEmpty
                                    multiple
                                    // inputProps={{ 'aria-label': 'Without label' }}
                                    className="w-100"

                                    MenuProps={MenuProps}
                                    >
                                        {/* <MenuItem value="">
                                                <em >None</em>
                                            </MenuItem> */}
                                            <MenuItem value={"500GM"}>500GM</MenuItem>
                                            <MenuItem value={"1KG"}>1KG</MenuItem>
                                            <MenuItem value={"2KG"}>2KG</MenuItem>
                                            <MenuItem value={"3KG"}>3KG</MenuItem>

                                    </Select>
                        </div>
                    </div>   


                    <div className="col">
                           <div className="form-group">
                        <h6>PRODUCT SIZE</h6>
                        <Select 
                                    value={productSize}
                                    onChange={handleChangeProductSize}
                                    displayEmpty
                                    multiple
                                    // inputProps={{ 'aria-label': 'Without label' }}

                                    MenuProps={MenuProps}
                                    className="w-100"
                                    >
                                        {/* <MenuItem value="">
                                                <em >None</em>
                                            </MenuItem> */}
                                            <MenuItem value={"S"}>S</MenuItem>
                                            <MenuItem value={"M"}>M</MenuItem>
                                            <MenuItem value={"L"}>L</MenuItem>
                                            <MenuItem value={"XL"}>XL</MenuItem>
                                            <MenuItem value={"XXL"}>XXL</MenuItem>

                                    </Select>
                        </div>
                    </div> 
                    <div className="col-md-4">
                                    <div className="form-group">
                                        <h6>RATINGS</h6>
                                        <Rating
                                            name="simple-controlled"
                                            value={ratingsValue}  precision={0.5}
                                            onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                                setFormFields(()=>({
                                                    ...formFields,
                                                    rating:newValue,
                                                }))
                                            }}
                                    />
                                    </div>
                         </div> 
          </div>

            </div>
                 
        </div>
      </div>

             <div className="card p-4 mt-0">
                <div className="imagesUploadSec">
                    <h5 className="mb-4">Media and Published</h5>

                    <div className="imgUploadBox d-flex align-items-center">
                            
                                {
                                    previews?.length !==0 && previews?.map((img,index)=>{
                                        return(
                                            <div className="uploadBox" key={index}>
                                                <img src={img} className="w-100"/>
                                            </div>
                                        )
                                    })
                                }
                          

                            <div className="uploadBox">
                                <input type="file" multiple onChange={(e)=>onChangeFile(e,'/api/products/upload')} name="images"/>

                                <div className="info">
                                    <MdOutlineCloudUpload/>
                                    <h5>Upload Image</h5>
                                </div>
                            </div>
                    </div>
                 

                </div>
                <br/>
                <Button type="submit" className="w-100 btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; {isLoading === true ? <CircularProgress color="inherit" 
                className=' loader'/> : 'PUBLISH AND VIEW'}</Button>
            </div>
           
              
      </form>
       </div> 
       </>
    )

}

export default ProductUpload;

                       





   