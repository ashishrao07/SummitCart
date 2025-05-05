import React, { useContext, useEffect, useState } from "react";
import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize , styled } from "@mui/material/styles";


import { Button } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import {deleteData, deleteImages, editData, fetchDataFromApi, postData} from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../App";
import { MdOutlineCloudUpload } from "react-icons/md";
import{Link, useParams} from "react-router-dom";

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



const EditCategory=()=>{
    
    const[files,setFiles]=useState([]);
    const[imgFiles,setImgFiles]=useState();
    const[previews,setPreviews]=useState();

    const[isSelectedFiles,setIsSelectedFiles]=useState(false);

    const history= useNavigate();
    const context=useContext(Mycontext);
    const fd=new FormData();

    let {id}=useParams();


    useEffect(()=>{
        if(!imgFiles) return;
        let tmp=[];
        for(let i=0;i<imgFiles.length;i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
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

      const [category,setcategory]=useState([]);
    useEffect(()=>{
        context.setProgress(20);

        /// may be for imageUpload nunchi images delete cheyyadaniki anukunta
        fetchDataFromApi('/api/category/imageUpload').then((res)=>{
            res?.map((item)=>{
                item?.images?.map((img)=>{
                    deleteImages(`/api/category/deleteImage?img=${img}`).then((res)=>{
                            deleteData("/api/imageUpload/deleteAllImages");
                    })
                })
            })
        });

        fetchDataFromApi(`/api/category/${id}`).then((res)=>{
            setcategory(res);
            setFormFields({
                name:res.name,
                subCat:res.subCat,
                color:res.color
            });
            setPreviews(res.images);

            context.setProgress(100);
        })
    },[])

    const[isLoading,setIsLoading]=useState(false);
    const [formFields,setFormFields]=useState({
        name:"",    // initally all empty 
        subCat:"",
        images:[],
        color:""
    });

    const changeInput=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name] : e.target.value
        }))
    }
    // const addImgUrl = (e)=>{     // coz images are taken as array so this is useful for it
    //     const arr=[];
    //     arr.push(e.target.value);
    //     setFormFields(()=>({
    //         ...formFields,
    //         [e.target.name] : arr
    //     }))
    //    }
      

    const onChangeFile=async(e,apiEndPoint)=>{
        try{
            const imgArr=[];
            const files=e.target.files;
            setImgFiles(e.target.files);
            for(var i=0;i<files.length;i++){

                //validate file type only mp3
                if(files[i] &&(files[i].type==='image/jpeg' || files[i].type==='image/png' || files[i].type==='image/jpg')){
                    setImgFiles(e.target.files)

                    const file=files[i];
                    imgArr.push(file);
                    fd.append('images',file);
                
                
            
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
   
    const editCategory=(e)=>{
        e.preventDefault();
        fd.append('name',formFields.name);
        fd.append('subCat',formFields.subCat);
        fd.append('color',formFields.color);
        if(formFields.name !=="" && formFields.subCat !=="" &&  formFields.color !=="" )
        {
        setIsLoading(true);
//postData place lo edit pettinam
        editData(`/api/category/${id}`,formFields).then(res=>{
            setIsLoading(false);
            history('/category')
        })
    }else{
       
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please fill all the Details"
        })
       return false;  // form shld not be submitted rht
    }
    }
   
  
  

    return(
        <>
        <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 mt-0">
           <h5 className="mb-0"> Edit Category</h5>
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
                   label="Category" 
                //    deleteIcon={<ExpandMoreIcon />}
              />

           <StyledBreadcrumb
               component='a'
                href="#"
              label="Add a Category" 
            //   deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
        </div>

    <form className="form " onSubmit={editCategory}>
      <div className="row ">
        <div className="col-sm-9 ">
            <div className="card p-4 mt=0">

                <div className="form-group pt-3">
                    <h6>Category Name</h6>
                    <input type="text" name="name" value={formFields.name} onChange={changeInput}/>
                </div>
                {/* <div className="form-group pt-3 ">
                    <h6>Image Url</h6>
                    <input type="text" name="images" onChange={addImgUrl}/>
                </div> */}

                <div className="form-group pt-3">
                    <h6> Sub Category </h6>
                    <input type="text" name="subCat" value={formFields.subCat} onChange={changeInput}/>
                </div>
              
                <div className="form-group pt-3 ">
                    <h6>Color</h6>
                    <input type="text" name="color" value={formFields.color} onChange={changeInput}/>
                </div>
                <div className="card p-4 mt-0">
                <div className="imagesUploadSec">
                    <h5 className="mb-4">Media and Published</h5>

                    <div className="imgUploadBox d-flex align-items-center">
                            
                          {
                                    previews?.length !==0 && previews?.map((img,index)=>{
                                        return(
                                            <div className="uploadBox" key={index}>

                                                {
                                                    isSelectedFiles===true ? <img src={img} className="w-100"/> : <img src={`${context.baseUrl}/uploads/${img}`} className="w-100"/>
                                                        

                                                        
                                                }
                                               
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
                <Button type="submit " className="w-100 btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className=' loader'/> : 'PUBLISH AND VIEW'}</Button>
            </div>

       
               

            </div>

          

        </div>
       
      </div>

           
      </form>
       </div> 
       </>
    )

}

export default EditCategory;