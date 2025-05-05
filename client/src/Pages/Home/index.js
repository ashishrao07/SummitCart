import HomeBanner from "../../Components/HeaderBanner";
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules'
import Rating from '@mui/material/Rating';

import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";
import banner2 from "../../assets/images/banner2.PNG";
import banner3 from "../../assets/images/banner3.PNG";
import banner4 from "../../assets/images/banner4.PNG";
import newsLetterImg from "../../assets/images/coupon.webp";
import { CiMail } from "react-icons/ci";
import Footer from "../../Components/Footer";
import { useEffect } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useState } from "react";
import { MyContext } from "../../App";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const Home=()=>{

    const[catData,setCatData]=useState([]);
    const [featuredProducts,setFeaturedProducts]=useState([]);
    const [productsData,setProductsData]=useState([]);
    const [electronicsData,setelectronicsData]=useState([]);
    const [value, setValue] = React.useState(0);
    const[selectedcat,setSelectedCat]=useState('fashion');
    const[filteredData,setFilteredData]=useState([]);

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

    const context=useContext(MyContext)

    const selectCat=(cat)=>{
        setSelectedCat(cat);
    }
    useEffect(()=>{
        window.scrollTo(0,0);
        
        setSelectedCat(context.categoryData[0]?.name)

        fetchDataFromApi("/api/category").then((res)=>{
            setCatData(res);
        })


        fetchDataFromApi(`/api/products/featured`).then((res)=>{
                setFeaturedProducts(res);

        })

        fetchDataFromApi(`/api/products?perPage=8`).then((res)=>{
            setProductsData(res);

        })

        
    },[]);
    
    useEffect(()=>{
        fetchDataFromApi(`/api/products?catName=${selectedcat}`).then((res)=>{
            setFilteredData(res.products);

        })
    },[selectedcat])
   
    
    return (
     <>
      <HomeBanner/>
      {
        context.categoryData?.length!==0 &&     <HomeCat catData={context.categoryData}/>
      }
  
      <section className="homeProducts">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                  <div className="sticky">
                  <div className="banner">
                        <img src="https://fullstack-ecommerce.netlify.app/static/media/banner1.957b2952d2e9b8c1f445.jpg" className='cursor w-100'/>
                    </div>
                 <div className="banner mt-4">
                    <img src={banner2} className="cursor w-100"/>
                    </div>  
                </div> 
                    
                </div>
                <div className="col-md-9 productRow ">
                    <div className="d-flex align-items-center">
                        <div className="info w-75">
                            <h3 className="mb-0 hd">POPULAR PRODUCTS</h3>
                            <p className="text-light text-sml mb-0">Do not miss the current offers untill the end of March</p>
                           
                        </div>
                        
                        <div className="ms-auto">
                        <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    className="filterTabs"
                         >
                            {
                                context.categoryData?.map((item,index)=>{
                                    return(
                                        <Tab className="item" label={item?.name} onClick={()=>selectCat(item?.name)}/>
                                )
                                })
                            }
                            </Tabs>
                        </div>

                    </div>

                    <div className="product_row w-100 mt-4">
                    <Swiper
                             slidesPerView={4}
                            spaceBetween={0}                    
                            Navigation={true}
                            slidesPerGroup={3}
                          modules={[Navigation]}
                                 className="mySwiper"
                    >
                        {
                            context.filteredData?.length !==0 && filteredData?.map((item,index)=>{
                                 return (
                                    <SwiperSlide key={index}>  
                                    <ProductItem item={item}/>
                                     
                                    </SwiperSlide>
                                 )
                            })
                        }
                 
                     {/* <SwiperSlide>  

                     <ProductItem/>
                     </SwiperSlide>
                     <SwiperSlide>  
                     <ProductItem/>
                     </SwiperSlide>

                     <SwiperSlide>  
                     <ProductItem/>
                     </SwiperSlide>        */}
                 </Swiper>
                    </div>

                    <div className="d-flex align-items-center mt-5">
                        <div className="info w-75">
                            <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                            <p className="text-light text-sml mb-0">New Products with updated stocks</p>

                        </div>
                        <Button className="viewAllBtn ms-auto">View All<IoIosArrowRoundForward/></Button>
                    </div>
                    <div className="product_row productRow2 d-flex w-100 mt-4">
                    {
                            productsData?.products?.length !==0 && productsData?.products?.map((item,index)=>{
                                 return (

                                     
                                     <ProductItem key={index} item={item}/>                          

                                 )
                            })
                        }
                    
                   
                    </div>

                    <div className="d-flex align-items-center mt-5">
                        <div className="info w-75">
                            <h3 className="mb-0 hd">ELECTRONICS</h3>
                            <p className="text-light text-sml mb-0">Do not miss the current offers untill the end of March</p>
                           
                        </div>
                        <Button className="viewAllBtn ms-auto">View All<IoIosArrowRoundForward/></Button>
                    </div>
                    <div className="product_row w-100 mt-4">
                    <Swiper
                             slidesPerView={4}
                            spaceBetween={0}                    
                            Navigation={true}
                            slidesPerGroup={3}
                          modules={[Navigation]}
                                 className="mySwiper"
                    >
                        {
                            featuredProducts?.length !==0 && featuredProducts?.map((item,index)=>{
                                 return (
                                    <SwiperSlide key={index}>  
                                    <ProductItem item={item}/>
                                     
                                    </SwiperSlide>
                                 )
                            })
                        }
                 </Swiper>
                    </div>




                         <div className="d-flex mt-4 mb-4  bannerSection">
                            <div className="banner">
                              <img src={banner3} className="cursor w-100"/>
                             </div>
                             <div className="banner">
                              <img src={banner4} className="cursor w-100"/>
                             </div>
                         </div>
                    
                </div>
                
            </div>
        </div>
        </section>

        <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                       <p className="text-white"> $20 discount on your first order</p>
                       <h2 className="text-white">Join our newsLetter and get...</h2>
                       <p className="text-light">Join our Email subscription now to get updates<br/> on promotions and coupons</p>
                   
                     <form>
                        <CiMail/>
                        <input type="text"placeholder="Your Email Address" />
                        <Button>Subscribe</Button>
                     </form>
                   
                    </div>
                    <div className="col-md-6">
                        <img src={newsLetterImg}/>
                        </div>
                </div>
            </div>
        </section>
       
     </>
    )
 }
 export default Home;