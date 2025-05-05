import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize , styled } from "@mui/material/styles";
import { Mycontext } from "../../App";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";

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

const AddSubCat=()=>{
   
    const [categoryVal,setcategoryVal] = useState('');
    const [formFields,setFormFields]=useState({
        category:"",    // initally all empty 
        subCat:"",
        
    });
    const[isLoading,setIsLoading]=useState(false);
    const context=useContext(Mycontext);
        const history= useNavigate();

    const handleChangeCategory = (event) => {
        setcategoryVal(event.target.value);
        setFormFields(()=>({
            ...formFields,
            category:event.target.value,
        }))
         
      };
      const inputChange=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value,
        }))
           
       };
       const addSubCat=(e)=>{
            e.preventDefault();
            const fd=new FormData();
            fd.append('category',formFields.category);
            fd.append('subCat',formFields.subCat);

            if(formFields.category==="" ){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Please select a category"
                });
                return false;
            }
            if(formFields.subCat==="" ){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Please enter sub category"
                });
                return false;
            }


        postData('/api/subCat/create',formFields).then(res=>{
            setIsLoading(false);
            history('/subCategory')
        });

       }

        return(
            <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 mt-0">
               <h5 className="mb-0"> Add Sub Category</h5>
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
                       label="Sub Category" 
                    //    deleteIcon={<ExpandMoreIcon />}
                  />
    
               <StyledBreadcrumb
                   component='a'
                    href="#"
                  label="Add a  Sub Category" 
                //   deleteIcon={<ExpandMoreIcon />}
                  />
                </Breadcrumbs>
            </div>

            <form className="form " onSubmit={addSubCat} >
                <div className="row ">
                    <div className="col-sm-9 ">
                        <div className="card p-4 mt=0">
                             <div className="row">
                             <div className="col">
                            <div className="form-group">
                            <h6>CATEGORY</h6>
                            <Select
                                value={categoryVal}
                                onChange={handleChangeCategory}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                name="category"
                                className="w-100 "
                                >
                                <MenuItem value="">
                                    <em value={null}>None</em>
                                </MenuItem>
                                {
                                    context.catData?.categoryList?.length!==0 && context.catData?.categoryList?.map((cat,index)=>{
                                        return(
                                            <MenuItem value={cat.id} key={cat.id || index}>{cat.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <h6> Sub Category</h6>
                                    <input type="text" name="subCat" value={formFields.subCat} onChange={inputChange}/>
                                </div>
                            </div>
                             </div>

                             <Button type="submit " className="w-100 btn-blue btn-lg btn-big"><FaCloudUploadAlt/> &nbsp; {isLoading === true ? <CircularProgress color="inherit" 
                className=' loader'/> : 'PUBLISH AND VIEW'}</Button>
                         </div>
                     </div> 
                 </div> 
            </form>  
        </div>
        )
}
export default AddSubCat;