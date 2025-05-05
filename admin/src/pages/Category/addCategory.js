import React, { useContext, useEffect, useState } from "react";
import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize , styled } from "@mui/material/styles";


import { Button } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import {deleteData, deleteImages, fetchDataFromApi, postData} from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../App";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

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



const AddCategory=()=>{
    

    const[imgFiles,setImgFiles]=useState([]);
    const[previews,setPreviews]=useState([]);
    const[isSelectedFiles,setIsSelectedFiles]=useState(false);
    const [uploading,setUploading]=useState(false);
    const history= useNavigate();
    const context=useContext(Mycontext);
    const fd=new FormData();

    // useEffect(()=>{
    //   fetchDataFromApi("/api/imageUpload").then((res)=>{
    //     res.map((item)=>{
    //       item?.images?.map((img)=>{
    //         deleteImages(`/api/imaageUpload/deleteAllImages`);
    //       })
    //     })
    //   })
    // },[])

useEffect(() => {
    if (!imgFiles) return;
    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
        tmp.push(URL.createObjectURL(imgFiles[i]));
    }

    const objectUrls = tmp;
    setPreviews(objectUrls);

    // cleanup memory correctly after use
    return () => {
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
}, [imgFiles]);



    

    const[isLoading,setIsLoading]=useState(false);
    const [formFields,setFormFields]=useState({
        name:"",    // initally all empty 

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
      

    
    let img_arr=[];
  let uniqueArray=[];

//   const onChangeFile = async (e, apiEndPoint) => {
//     try {
//       const files = e.target.files
//       setUploading(true)
//       for (var i = 0; i < files.length; i++) {
//         // Validate file type only JPG, PNG, etc.
//         if (
//           files[i] &&
//           (files[i].type === "image/jpeg" ||
//             files[i].type === "image/png" ||
//             files[i].type === "image/jpg" ||
//             files[i].type === "image/webp")
//         ) {
//           const file = files[i]
//           fd.append(images, file)
//         } else {
//           context.setAlertBox({
//             open: true,
//             error: true,
//             msg: "Please select a valid JPG or PNG file",
//           })
//           setUploading(false) // Stop uploading if invalid file is selected
//           return
//         }
//       }
  
//       // Continue with the upload logic
//       const res = await postData(apiEndPoint, fd)
  
//       // Fetch the uploaded images
//       const response = await fetchDataFromApi("api/imageUpload")
  
//       // Check if response is an array and has items
//       if (Array.isArray(response) && response.length > 0) {
//         const img_arr = []
  
//         // Process each item in the response array
//         response.forEach((item) => {
//           // Check if item has images array
//           if (item && item.images && Array.isArray(item.images)) {
//             // Add each image to img_arr
//             item.images.forEach((img) => {
//               img_arr.push(img)
//             })
//           }
//         })
  
//         // Create a unique array of images
//         const uniqueArray = [...new Set(img_arr)]
  
//         // Update previews with existing and new images
//         const appendedArray = [...previews, ...uniqueArray]
//         setPreviews(appendedArray)
  
//         setTimeout(() => {
//           setUploading(false)
//           context.setAlertBox({
//             open: true,
//             error: false,
//             msg: "Images Uploaded!",
//           })
//         }, 200)
//       } else {
//         // Handle case where response is not an array
//         setUploading(false)
//         context.setAlertBox({
//           open: true,
//           error: true,
//           msg: "Failed to retrieve uploaded images",
//         })
//       }
//     } catch (error) {
//       console.error("Error uploading images:", error)
//       setUploading(false)
//       context.setAlertBox({
//         open: true,
//         error: true,
//         msg: "Error uploading images",
//       })
//     }
//   }
const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files
      if (!files || files.length === 0) {
        context.setAlertBox({
          open: true,
          error: true,
          msg: "No files selected",
        })
        return
      }
  
      // Set the files for preview
      setImgFiles(files)
  
      setUploading(true)
  
      // Clear the FormData object to prevent duplicate files
      for (const pair of fd.entries()) {
        fd.delete(pair[0])
      }
  
      // Add files to FormData
      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i]
          fd.append('images', file)
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG file",
          })
          setUploading(false)
          return
        }
      }
  
      try {
        // Upload the images
        await postData(apiEndPoint, fd)
  
        // Fetch the uploaded images
        const response = await fetchDataFromApi("api/imageUpload")
  
        if (response && Array.isArray(response)) {
          const img_arr = []
  
          // Process each item in the response array
          response.forEach((item) => {
            if (item && item.images && Array.isArray(item.images)) {
              item.images.forEach((img) => {
                if (img) img_arr.push(img)
              })
            }
          })
  
          // Create a unique array of images
          const uniqueArray = [...new Set(img_arr)]
  
          // Get current previews (ensure it's an array)
          const currentPreviews = Array.isArray(previews) ? previews : []
  
          // Update previews with existing and new images
          setPreviews([...currentPreviews, ...uniqueArray])
  
          setUploading(false)
          context.setAlertBox({
            open: true,
            error: false,
            msg: "Images Uploaded!",
          })
        } else {
          throw new Error("Invalid response format")
        }
      } catch (error) {
        console.error("Error processing uploaded images:", error)
        setUploading(false)
        context.setAlertBox({
          open: true,
          error: true,
          msg: "Failed to process uploaded images",
        })
      }
    } catch (error) {
      console.error("Error in file upload:", error)
      setUploading(false)
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Error uploading images",
      })
    }
  }
  
  const removeImg = async (index, imageUrl) => {
       const imgIndex=previews.indexOf(imageUrl);
       deleteImages(`/api/category/deleteImage?.img=${imageUrl}`).then((res)=>{
        context.setAlertBox({
          open:true,
          error:false,
          msg:"Image Deleted!"
        })
       })
       if(imgIndex> -1){
        previews.splice(index,1);
       }
  }
  

    
      
   
    const addCategory=(e)=>{
        e.preventDefault();

        const appendedArray=[...previews, ...uniqueArray];


        img_arr=[];

        fd.append('name',formFields.name);
        fd.append('color',formFields.color);
        fd.append('images',appendedArray);

        formFields.images=appendedArray;
        
        if(formFields.name !=="" && formFields.color !==""  && previews?.length !== 0 )
        {
        setIsLoading(true);

        postData('/api/category/create',formFields).then(res=>{
            setIsLoading(false);
            context.fetchCategory();
            context.fetchSubCategory();
            deleteData("api/imageUpload/deleteAllImages")
            history('/category')
        });

    }else{
       
        context.setAlertBox({
            open:true,
            error:true,
            msg:"Please fill all the Details"
        });
       return false;  // form shld not be submitted rht
    }
    }
   
    // Remove image function
//   const removeImg = async (index, imageUrl) => {
//     try {
//       // Remove the image from the previews array by filtering out the imageUrl
//       const updatedPreviews = previews.filter((img, i) => i !== index);
//       setPreviews(updatedPreviews);  // Update previews state

//       // Call backend API to remove image from the server (optional)
//       const response = await deleteData('/remove-img', { imageUrl });

//       if (response.success) {
//         console.log('Image removed successfully');
//       }
//     } catch (error) {
//       console.error('Error removing image:', error);
//     }
//   };
  

    return(
        <>
        <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 mt-0">
           <h5 className="mb-0"> Add Category</h5>
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

    <form className="form " onSubmit={addCategory}>
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
                                                <span className="remove" onClick={()=>removeImg(index,img)}><IoCloseSharp/>
                                                </span>
                                         
                                            <div className="uploadBox" key={index}>
                                                <img src={img} className="w-100"/>
                                            </div>
                                            </div>
                                        )
                                    })
                         }
                          

                            <div className="uploadBox">
                            {
                                    uploading === true ?
                                    <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column"> 
                                        <CircularProgress/>
                                        <span>uploading...</span>
                                    </div>

                                    :

                                    <>
                                         <input type="file" multiple onChange={(e)=>onChangeFile(e,'/api/category/upload')} name="images"/>
                                         <div className="info">
                                            <MdOutlineCloudUpload/>
                                            <h5>Upload Image</h5>
                                         </div>
                                    </>
                                }
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

export default AddCategory;


// import React, { useContext, useEffect, useState } from "react";
// import  Breadcrumbs from "@mui/material/Breadcrumbs";
// import Chip from "@mui/material/Chip";
// import HomeIcon from '@mui/icons-material/Home';
// import { emphasize , styled } from "@mui/material/styles";


// import { Button } from "@mui/material";
// import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
// import {postData} from '../../utils/api';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useNavigate } from "react-router-dom";
// import { Mycontext } from "../../App";
// import { MdOutlineCloudUpload } from "react-icons/md";

// const StyledBreadcrumb =styled(Chip)(({theme})=>{
//     const backgroundColor=
//     theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

//     return{
//         backgroundColor,
//         height: theme.spacing(3),
//         color:theme.palette.text.primary,
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover, &:focus':{
//             backgroundColor:emphasize(backgroundColor,0.06),

//         },
//         '&:active':{
//             boxShadow:theme.shadows[1],
//             backgroundColor:emphasize(backgroundColor,0.12),
//         }
//     }
// })



// const CategoryAdd=()=>{
    
//     const[files,setFiles]=useState([]);
//     const[imgFiles,setImgFiles]=useState();
//     const[previews,setPreviews]=useState();

//     const history= useNavigate();
//     const context=useContext(Mycontext);
//     const fd=new FormData();


//     useEffect(()=>{
//         if(!imgFiles) return;
//         let tmp=[];
//         for(let i=0;i<imgFiles.length;i++){
//             tmp.push(URL.createObjectURL(imgFiles[i]));
//         }

//         const objectUrls=tmp;
//         setPreviews(objectUrls);

//         //free memory
//         for(let i=0;i<objectUrls.length;i++){
//             return ()=>{
//                 URL.revokeObjectURL(objectUrls[i])
//             }
//         }
//       },[imgFiles])


    

//     const[isLoading,setIsLoading]=useState(false);
//     const [formFields,setFormFields]=useState({
//         name:"",    // initally all empty 
//         images:[],
//         color:""
//     });

//     const changeInput=(e)=>{
//         setFormFields(()=>({
//             ...formFields,
//             [e.target.name] : e.target.value
//         }))
//     }
//     // const addImgUrl = (e)=>{     // coz images are taken as array so this is useful for it
//     //     const arr=[];
//     //     arr.push(e.target.value);
//     //     setFormFields(()=>({
//     //         ...formFields,
//     //         [e.target.name] : arr
//     //     }))
//     //    }
      

//     const onChangeFile=async(e,apiEndPoint)=>{
//         try{
//             const imgArr=[];
//             const files=e.target.files;
//             setImgFiles(e.target.files);
//             for(var i=0;i<files.length;i++){
//                 const file=files[i];
//                 imgArr.push(file);
//                 fd.append(`images`,file);
//             }
//             setFiles(imgArr);
           
//             postData(apiEndPoint,fd).then((res)=>{

//         });
//         }catch(error){
//             console.log(error);
//         }
//       }
   
//     const addCategory=(e)=>{
//         e.preventDefault();
//         fd.append('name',formFields.name);
//         fd.append('color',formFields.color);
//         if(formFields.name !=="" && formFields.color !=="" )
//         {
//         setIsLoading(true);

//         postData('/api/category/create',formFields).then(res=>{
//             setIsLoading(false);
//             history('/category')
//         })
//     }else{
       
//         context.setAlertBox({
//             open:true,
//             error:true,
//             msg:"Please fill all the Details"
//         })
//        return false;  // form shld not be submitted rht
//     }
//     }
   
  
  

//     return(
//         <>
//         <div className="right-content w-100">
//         <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
//            <h5 className="mb-0"> Add Category</h5>
//            <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
//                 <StyledBreadcrumb
//                    component='a'
//                    href="#"
//                    label='Dashboard'
//                    icon={<HomeIcon fontSize="small" />}
//                />
//               <StyledBreadcrumb
//                        component='a'
//                        href="#"
//                    label="Category" 
//                 //    deleteIcon={<ExpandMoreIcon />}
//               />

//            <StyledBreadcrumb
//                component='a'
//                 href="#"
//               label="Add a Category" 
//             //   deleteIcon={<ExpandMoreIcon />}
//               />
//             </Breadcrumbs>
//         </div>

//     <form className="form " onSubmit={addCategory}>
//       <div className="row ">
//         <div className="col-sm-9 ">
//             <div className="card p-4">

//                 <div className="form-group pt-3">
//                     <h6>Category Name</h6>
//                     <input type="text" name="name" onChange={changeInput}/>
//                 </div>
//                 {/* <div className="form-group pt-3 ">
//                     <h6>Image Url</h6>
//                     <input type="text" name="images" onChange={addImgUrl}/>
//                 </div> */}

              
//                 <div className="form-group pt-3 ">
//                     <h6>Color</h6>
//                     <input type="text" name="color" onChange={changeInput}/>
//                 </div>
//                 <div className="card p-4 mt-0">
//                 <div className="imagesUploadSec">
//                     <h5 className="mb-4">Media and Published</h5>

//                     <div className="imgUploadBox d-flex align-items-center">
                            
//                           {
//                                     previews?.length !==0 && previews?.map((img,index)=>{
//                                         return(
//                                             <div className="uploadBox" key={index}>
//                                                 <img src={img} className="w-100"/>
//                                             </div>
//                                         )
//                                     })
//                                 }
                          

//                             <div className="uploadBox">
//                                 <input type="file" multiple onChange={(e)=>onChangeFile(e,'/api/products/upload')} name="images"/>

//                                 <div className="info">
//                                     <MdOutlineCloudUpload/>
//                                     <h5>Upload Image</h5>
//                                 </div>
//                             </div>
//                     </div>
                 

//                 </div>
//                 <br/>
//                 <Button type="submit " className="w-100 btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; {isLoading === true ? <CircularProgress color="inherit" className=' loader'/> : 'PUBLISH AND VIEW'}</Button>
//             </div>

       
               

//             </div>

          

//         </div>
       
//       </div>

           
//       </form>
//        </div> 
//        </>
//     )

// }

// export default CategoryAdd;