import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize , styled } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import  Checkbox  from '@mui/material/Checkbox';
import { Mycontext } from '../../App';


const label={ inputProps: {'aria-label' : 'Checkbox demo'}};

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

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];
  export const options = {
    'backgroundColor':'transparent',
    'chartArea': { width: "80%", height: "70%" },
    
  };
  
const SubCategory=()=>{
  
  const context=useContext(Mycontext);
  const [subCatData,setSubCatData]=useState([]);
 

  // First useEffect for initial load and scroll behavior
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   context.setProgress(20)    //loading bar top
  //   fetchDataFromApi(`/api/category`).then((res) => {
  //     setCatData(res);
  //     console.log(res);
  //     context.setProgress( 100)
  //   });
  // }, []); // Empty dependency array means this runs once on mount

  // Second useEffect for data fetching
  useEffect(() => {
     window.scrollTo(0, 0);
    context.setProgress(20) 
    fetchDataFromApi('/api/subCat').then((res) => {
      setSubCatData(res);
      context.setProgress(100) 
    });
  }, []); 

  const handleChange = (event, value) => {
    context.setProgress(40) 
    fetchDataFromApi(`/api/subCat?.page=${value}`).then((res) => {
      setSubCatData(res);
      context.setProgress(100) 
    });
  };

      
 
  const deleteCategory=(id)=>{
    deleteData(`/api/subCat/${id}`).then(res=>{
      fetchDataFromApi('/api/subCat').then((res)=>{
        setSubCatData(res);

       
      })
    })
  };

  

return(
    <>
       <div className="right-content w-100">
       <div className="card shadow border-0 w-100 flex-row p-4">
               <h5 className="mb-0">Sub Category List</h5>
                  <div className='ms-auto d-flex align-items-center'>
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
                                    label=" Sub Category" 
                               
                               />

                         
                             </Breadcrumbs>
                      <Link to={"/subCategory/add"}><Button className='ms-3 btn-blue ps-3 pe-3'>Add Sub Category</Button></Link>
                   </div> 
          </div>   

      

        <div className="card shadow border-0 p-3 mt-4">
        
            <div className="table-responsive mt-4">
              <table className="table table-bordered v-align">
                <thead className="table-dark">
                  <tr>
                    <th>UID</th>
                    <th style={{width:"100px"}}>IMAGE</th>
                    <th>CATEGORY</th>
                    <th>SUB CATEGORY</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    subCatData?.subCategoryList?.length !==0 && subCatData?.subCategoryList?.map((item,index)=>{
                       return (
                        <tr>
                        <td>
                          <div className='d-flex align-items-center'>
                             <Checkbox {...label} /> <span>#{index+1}</span>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center productBox">
                              <div className="imgWrapper">
                                 <div className="img card shadow m-0">
                                 <img src={item.category?.images?.[0] || '/placeholder.jpg'}
                                    
                          //  <img src={`${context.baseUrl}/uploads/${item.category.images[0]}`}
                                     className="w-100"></img>
                                 </div>
                              </div>
                           
                          </div>
                      </td>
                       
                        <td>{item?.category?.name}</td>

                        <td>{item.subCat}</td>
                       

                        <td>
                           <div className="actions d-flex align-items-center justify-content-center">
                            <Link to={`/subCategory/edit/${item.id}`}>

                                        <Button color="success" className="success" ><MdModeEditOutline/></Button>
                              </Link>
                               <Button color="error" className="error" onClick={()=> deleteCategory(item.id)}><MdDelete/></Button>
                           </div>
                        </td>
                    </tr>
                       )
                    })
                  }
                
                 
                </tbody>

              </table>
              <div className="d-flex tableFooter">
                {/* <p>showing <b>{page}</b> out of <b>{catData?.length}</b> results</p> */}
              <Pagination count={subCatData?.totalPages} color="primary" showFirstButton showLastButton className="pagination" onChange={handleChange}/>
              </div>
            </div>

        </div>
          
       </div>


      
    </>
)
}
export default SubCategory;