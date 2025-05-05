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
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import CircularProgress from '@mui/material/CircularProgress';
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
  
const Category=()=>{
  
  const context=useContext(Mycontext);
  const [catData,setCatData]=useState([]);
  const [open, setOpen] = useState(false);
  const[page,setPage]=useState(1);
  const[editId,setEditId]=useState(null);

  const[isLoading,setIsLoading]=useState(false);
 

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
    fetchDataFromApi(`/api/category?page=${page}`).then((res) => {
      setCatData(res);
      console.log("Data fetched for page:", page);
      context.setProgress(100) 
    });
  }, [page]); // Runs whenever page changes

  const handleChange = (event, value) => {
    setPage(value);   
  };

      
 
  const deleteCategory=(id)=>{
    deleteData(`/api/category/${id}`).then(res=>{
      fetchDataFromApi('/api/category').then((res)=>{
        setCatData(res);

       
      })
    })
  };

  

return(
    <>
       <div className="right-content w-100">
       <div className="card shadow border-0 w-100 flex-row p-4">
               <h5 className="mb-0">Category List</h5>
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
                                    label="Category" 
                               
                               />

                         
                             </Breadcrumbs>
                      <Link to={"/category/add"}><Button className='ms-3 btn-blue ps-3 pe-3'>Add Category</Button></Link>
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
                    <th>Color</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    catData?.categoryList?.length !==0 && catData?.categoryList?.map((item,index)=>{
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
                                   <img src={item.images[0]}
                                   /* <img src={`${context.baseUrl}/uploads/${item.images[0]}`} */
                                     className="w-100"></img>
                                 </div>
                              </div>
                           
                          </div>
                      </td>
                       
                        <td>{item.name}</td>

                        <td>{item.color}</td>
                       

                        <td>
                           <div className="actions d-flex align-items-center justify-content-center">
                            <Link to={`/category/edit/${item.id}`}>

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
              <Pagination count={catData?.totalPages} color="primary" showFirstButton showLastButton className="pagination" onChange={handleChange}/>
              </div>
            </div>

        </div>
          
       </div>


       {/* <Dialog
       className='editModel'
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
           
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Category</DialogTitle>
        <form >
        <DialogContent>
          <div className='form-group mb-3'>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Category Name"
                  type="text"
                  fullWidth
                  value={formFields.name}
                  onChange={changeInput}      ///so we can edit the values in the fields
                />
          </div>     
         <div className='form-group mb-3'>
                <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="images"
                label="Category Image"
                type="text"
                fullWidth
                value={formFields.images}
                onChange={addImgUrl}
              />
        </div>
        <div className='form-group mb-3'>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="color"
                label="Category Color"
                type="text"
                fullWidth
                value={formFields.color}
                onChange={changeInput}
              />
        </div>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          <Button type="button" onClick ={categoryEditFun} variant='contained'> {isLoading === true ? <CircularProgress color="inherit" className=' loader'/> : 'Submit'}</Button>
        </DialogActions>
        </form>
        <br/>
      </Dialog> */}
      
    </>
)
}
export default Category;