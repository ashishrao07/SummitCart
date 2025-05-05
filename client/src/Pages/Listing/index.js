import Sidebar from '../../Components/Sidebar';
import banner1 from '../../assets/images/sidebar-right.webp'
import Button from '@mui/material/Button';
import { PiDotsThreeVerticalFill } from "react-icons/pi";

import { IoIosMenu } from "react-icons/io";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { CgMenuGridR } from "react-icons/cg";

import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useContext, useEffect, useState } from 'react';
import ProductItem from '../../Components/ProductItem';
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';



const Listing=()=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [productView,setproductView]=useState('four');
    const openDropdown = Boolean(anchorEl);
    const [productData,setProductData]=useState([]);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {id}=useParams();

  useEffect(()=>{
    fetchDataFromApi(`/api/products?subCatId=${id}`).then((res)=>{
      setProductData(res.products);
    })
  },[id])

  useEffect(()=>{
    window.scrollTo(0,0);

    let url=window.location.href;
    let apiEndPoint="";

    if(url.includes('subCat')){
      apiEndPoint=`/api/products?subCat=${id}`
    }
    if(url.includes('category')){
      apiEndPoint=`/api/products?category=${id}`
    }
    fetchDataFromApi(`${apiEndPoint}`).then((res)=>{
      console.log(res)
      setProductData(res.data);
    })
    
  },[id])

  const filterData=(subCatId)=>{
    fetchDataFromApi(`/api/products?subCatId=${subCatId}`).then((res)=>{
      setProductData(res.products);
    })
  }

  const filterByPrice=(price,subCatId)=>{
    fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}`).then((res)=>{
      setProductData(res.products);
    })
  }

  const filterByRating=(rating,subCatId)=>{
    fetchDataFromApi(`/api/products?rating=${rating}&subCatId=${subCatId}`).then((res)=>{
      setProductData(res.products);
    })
  }
    return(
    <>
  <section className='product_Listing_Page'>
    <div className='container'>
        <div className="productListing d-flex">
            <Sidebar filter={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating}/>
            <div className='content-right'>
                  <img src={banner1} className='w-100 ' style={{borderRadius:'8px'}}/>
                    <div className='showBy mt-3 mb-3 d-flex align-items-center'>
                        <div className='d-flex align-items-center btnWrapper'>
                            <Button className={productView==='one' && 'act'} onClick={()=>setproductView('one')}><PiDotsThreeVerticalFill/></Button>
                            <Button className={productView==='three' && 'act'} onClick={()=>setproductView('three')}><CgMenuGridR/></Button>
                            <Button className={productView==='four' && 'act'} onClick={()=>setproductView('four')}><TfiLayoutGrid4Alt /></Button>
                            
                        </div>
                        <div className='ms-auto showByFilter'>
                            <Button onClick={handleClick}>Show < FaAngleDown/> </Button>
                            <Menu
                            className='w-100 showPerPageDropdown'
                                 id="basic-menu"
                                anchorEl={anchorEl}
                                open={openDropdown}
                                  onClose={handleClose}
                                  MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                        }}
                            >
                                 <MenuItem onClick={handleClose}>10</MenuItem>
                                 <MenuItem onClick={handleClose}>20</MenuItem>
                                 <MenuItem onClick={handleClose}>30</MenuItem>
                                 <MenuItem onClick={handleClose}>40</MenuItem>
                                 <MenuItem onClick={handleClose}>50</MenuItem>
                                 <MenuItem onClick={handleClose}>60</MenuItem>
                           </Menu>
                        </div>
                    </div>
                    <div className='productListing'>

                      {
                        productData?.map((item,index)=>{
                          return(
                            <ProductItem itemView={productView} key={index} item={item}/>
                          )
                        })
                      }
                        {/* <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/>
                        <ProductItem itemView={productView}/> */}
                    </div>


                <div className='d-flex align-items-center justify-content-center mt-5'>
                    <Pagination count={10} color="primary" size='large'/>
                    </div>    
            </div>
        </div>
    </div>
  </section>

    </>
    )
}
export default Listing;