import DashboardBox from "./components/dashboardBox";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { HiShoppingBag } from "react-icons/hi2";
import { TbStarsFilled } from "react-icons/tb";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";

import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import { Mycontext } from "../../App";
import { Rating } from "@mui/material";
import { deleteData, fetchDataFromApi } from "../../utils/api";

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
  
const Dashboard=()=>{
  
  const [showBy, setshowBy] = useState('');
  const [catBy,setCatBy]=useState('');
  const [categoryVal,setcategoryVal] = useState('');
  

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event)=> {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const[productList,setProductList]=useState([]);
    const context=useContext(Mycontext);
    
        //It will delete the product //Eye button onclick fun pettinam
 const deleteProduct=(id)=>{   
  context.setProgress(40);
  deleteData(`/api/products/${id}`).then((res)=>{
    context.setProgress(100);
    context.setAlertBox({
      open:true,
      msg:'Product Deleted ',
      error:true
    });
    fetchDataFromApi('/api/products').then((res)=>{
      setProductList(res);
    });
  })
}
const handleChange=(event,value)=>{
  context.setProgress(20) 
    fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
      setProductList(res);

      context.setProgress(100) 
    });
}
useEffect(()=>{
  
  window.scrollTo(0,0);
        context.setProgress(40);
  fetchDataFromApi('/api/products').then((res)=>{
          setProductList(res);
          console.log(res);
          context.setProgress(100);
  })
},[])

const handleChangeCategory = (event) => {
  setcategoryVal(event.target.value);
  
   
};

return(
    <>
       <div className="right-content w-100">
          <div className="row dashboardBoxWrapperRow">
            <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
                <DashboardBox color={["#4caf50","#a5d6a7"]} icon={<FaUsers/>} title={"Total Users"} count={6999} grow={true}/>
                <DashboardBox color={["#c012e2","#eb64fe"]} icon={<FaCartShopping/>} title={"Total Orders"} count={1090} />
                <DashboardBox color={["#2c78e5","#60aff5"]} icon={<HiShoppingBag/>} title={"Total Products"} count={99699}/>
                <DashboardBox color={["#ffcc80","#ffab40"]} icon={<TbStarsFilled/>} title={"Total Reviews"} count={557}/>
           </div>
            </div>

            <div className="col-md-4 ps-0 topPart2">
                <div className="box graphBox">
                    <div className="d-flex align-items-center w-100 bottomEle">
                <h4 className="text-white mb-0 mt-0">Total Sales</h4>
                <div className="ms-auto">
                <Button className="ms-auto toggleIcon" onClick={handleClick}
                ><HiDotsVertical/></Button>

                <Menu
                    className="dropdown_menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        
          <MenuItem  onClick={handleClose}>
            <IoTimerOutline />  Last Day
          </MenuItem>
          <MenuItem  onClick={handleClose}>
          <IoTimerOutline />  Last week
          </MenuItem>
          <MenuItem  onClick={handleClose}>
          <IoTimerOutline />  Last Month
          </MenuItem>
          <MenuItem  onClick={handleClose}>
          <IoTimerOutline />   Last Year
          </MenuItem>
         
      </Menu>

                </div>
                    </div>

                    <h3 className="text-white font-weight-bold">$9,969,143.00</h3>
                    <p >$6,999,143.00 in Last Month</p>

                    <Chart
                        chartType="AreaChart"
                          width="100%"
                         height="200px"
                         data={data}
                         options={options}
                    />

                </div>
            </div>

          </div>

        <div className="card shadow border-0 p-3 mt-4">
            <h3 className="hd">Best Selling Products</h3>

            <div className="row cardFilters mt-3">
                <div className="col-md-3">
                    <h4>SHOW BY</h4>
                    <FormControl className="w-100" size="small">
                    <Select
                           
                            value={showBy}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(event)=>setshowBy(event.target.value)}
                            className="w-100"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={12}>Rows</MenuItem>
                            <MenuItem value={24}>Rows</MenuItem>
                            <MenuItem value={36}>Rows</MenuItem>
                  </Select>

                  </FormControl>
                </div>

                <div className="col-md-3">
                    <h4>CATEGORY BY</h4>
                    <FormControl className="w-100" size="small">
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
                                        <MenuItem value={cat.id} key={cat.id || index}>{cat.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>

                  </FormControl>
                </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-bordered v-align">
                <thead className="table-dark">
                  <tr>

                    <th style={{width:"300px"}}>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>SUB CATEGORY</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>RATING</th>
                    {/* <th>ORDER</th>
                    <th>SALES</th> */}
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {
                      productList?.products?.length!==0 && productList?.products?.map((item,index)=>{
                        return (
                          <tr>

                          <td>
                              <div className="d-flex align-items-center productBox">
                                  <div className="imgWrapper">
                                     <div className="img card shadow m-0">
                                       <img src={`${context.baseUrl}/uploads/${item.images[0]}`}
                                         className="w-100"></img>
                                     </div>
                                  </div>
                                <div className="info ms-3">
                                  <h6>{item?.name}</h6>
                                  <p>{item?.description}</p>
                                </div>
                              </div>
                          </td>
                          {/* it shld be category.name not just category */}
                          <td>{item?.category?.name || 'No Category'}</td> 
                          <td>{item?.subCat || 'No Sub Category'}</td>    
                          <td>{item?.brand}</td>
                          <td>
                            <del className="old">Rs {item.oldPrice}</del>
                            <span className="new text-danger">Rs {item.price}</span>
                          </td>
                          <td>{item.countInStock}</td>
                          <td>
                         
                            <Rating name="read-only" defaultValue={item.rating} precision={0.5} size="small" readOnly/>
                          </td>
                          {/* <td>380</td>
                          <td>$38k</td> */}
                          <td>
                             <div className="actions d-flex align-items-center justify-content-center">
                             <Link to="/product/details"><Button color="secondary" className="secondary"><FaEye/></Button></Link> 

                             <Link to={`/product/edit/${item.id}`}>
                                    <Button color="success" className="success"><MdModeEditOutline/></Button>
                             </Link>
                                 
                                 <Button color="error" className="error" onClick={()=>deleteProduct(item.id)}><MdDelete/></Button>
                             </div>
                          </td>
                      </tr>
                        )
                      })
                  }
                
              
                </tbody>

              </table>
              {
                  productList?.totalPages>1 && 
                  <div className="d-flex tableFooter">
                  {/* <p>showing <b>12</b> out of <b>60</b> results</p> */}
                
                <Pagination count={productList?.totalPages} color="primary" showFirstButton showLastButton className="pagination" onChange={handleChange}/>
                </div>

              }
           
            </div>

        </div>
          
       </div>
    </>
)
}
export default Dashboard;