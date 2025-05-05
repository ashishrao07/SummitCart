import React, { useRef } from "react";


import  Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from '@mui/icons-material/Home';

import { emphasize , styled } from "@mui/material/styles";

import Slider from "react-slick";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaDropbox } from "react-icons/fa6";
import { IoPricetagSharp } from "react-icons/io5";
import { IoColorPalette } from "react-icons/io5";
import { BiSolidMemoryCard } from "react-icons/bi";
import { MdOutlinePriceChange } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import UserAvatarImgComponent from "../../components/userAvatarImg";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaReplyAll } from "react-icons/fa";


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

const ProductDetails=()=>{
         
        const productSliderBig=useRef();
        const productSliderSml=useRef();

                var productSliderOptions = {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                };
                var productSliderSmlOptions = {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows:false
                };
                
                const goToSlide=(index)=>{
                    productSliderBig.current.slickGoTo(index);
                    productSliderSml.current.slickGoTo(index);
                }
             return(

                <>
                    <div className="right-content w-100">
                         <div className="card shadow border-0 w-100 flex-row p-4">
                            <h5 className="mb-0">Product View</h5>
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
                               
                               />

                            <StyledBreadcrumb
                                component='a'
                                 href="#"
                               label="Product View" 

                               />
                             </Breadcrumbs>
                         </div>
                        

                         <div className="card productDetailsSection">

                            <div className="row">
                                 <div className="col-md-5">
                                    <div className="sliderWrapper pb-3 pt-3 ps-4 pe-4">
                                    <h6 className="mb-4 "> Product Gallery</h6>
                                           <Slider {...productSliderOptions} ref={productSliderBig} className="sliderBig mb-2">
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item">
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp" className="w-100"/>
                                                    </div>
                                                   

                                            </Slider>

                                            <Slider {...productSliderSmlOptions} ref={productSliderSml} className="sliderSml">
                                                    <div className="item" onClick={()=> goToSlide(1)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(2)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(3)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(4)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(5)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(6)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(7)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp" className="w-100"/>
                                                    </div>
                                                    <div className="item" onClick={()=> goToSlide(8)}>
                                                        <img src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp" className="w-100"/>
                                                    </div>
                                            </Slider>
                                    </div>
  
                                 </div>

                                <div className="col-md-7">
                                  <div className=" pb-3 pt-3 ps-4 pe-4">
                                    <h6 className="mb-4 "> Product Details</h6>

                                    <h4>Formal suits for men wedding slim fit 3 piece dress business party jacket</h4>

                                    <div className="productInfo mt-4">
                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon "><SiHomeassistantcommunitystore/></span>
                                                <span className="name">Brand</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>ecstasy</span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><FaDropbox/></span>
                                                <span className="name">Category</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>Men's</span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><IoPricetagSharp/></span>
                                                <span className="name">Tags</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>
                                                  <ul className="list list-inline tags sml" >
                                                    <li className="list-inline-item">
                                                        <span>SUITE</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>PARTY</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>DRESS</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>SMART</span>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <span>MAN</span>
                                                    </li>
                                                  </ul>
                                            </span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><IoColorPalette/></span>
                                                <span className="name">color</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>
                                                    <ul className="list list-inline tags sml" >
                                                            <li className="list-inline-item">
                                                                <span>RED</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>BLUE</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>BLACK</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>MAROON</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>GREEN</span>
                                                            </li>
                                                           
                                                        </ul>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><BiSolidMemoryCard/></span>
                                                <span className="name">Size</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>
                                                    <ul className="list list-inline tags sml" >
                                                            <li className="list-inline-item">
                                                                <span>SM</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>MD</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>LG</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>XL</span>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <span>XXL</span>
                                                            </li>
                                                        </ul>
                                            </span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><MdOutlinePriceChange/></span>
                                                <span className="name">Price</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>
                                                     <del className="old">$69.00</del>
                                                     <span className="new text-danger">$99.00</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><IoIosCart/></span>
                                                <span className="name">Stock</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>(68) piece</span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><FaStarHalfAlt/></span>
                                                <span className="name">Review</span>
                                            </div>
                                            <div className="col-sm-7">
                                            :   <span>(03) review</span>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icon"><MdVerified/></span>
                                                <span className="name">Published</span>
                                            </div>
                                            <div className="col-sm-7">
                                                :   <span> 26 March 2024</span>
                                            </div>
                                        </div>

                                        
                                    </div>
                                  </div>
                                </div>
                            </div>

                         <div className="p-4">
                         <h6 className="mt-4 mb-3">Product Description</h6>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse
                                cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! Sit voluptatem
                                delectus nam, molestiae, repellendus ab sint quo aliquam debitis amet natus doloremque laudantium? Repudiandae, 
                                consequuntur, officiis quidem quo deleniti, autem non laudantium sequi error molestiae ducimus accusamus facere 
                                velit consectetur vero dolore natus nihil temporibus aspernatur quia consequatur? Consequuntur voluptate deserunt
                                repellat tenetur debitis molestiae doloribus dicta. In rem illum dolorem atque ratione voluptates asperiores maxime
                                    doloremque laudantium magni neque ad quae quos quidem, quaerat rerum ducimus blanditiis reiciendis</p>

                                <br/>
                             <h6 className="mt-4 mb-4">Rating Analytics</h6>       
                             <div className="ratingSection ">
                                <div className="ratingrow d-flex aloign-items-center ">
                                    <span className="col1">
                                        5 Star
                                    </span>

                                    <div className="col2 mt-2">

                                            <div className="progress">
                                            <div className="progress-bar bg-warning" style={{width:"90%"}}>

                                            </div>
                                            </div>
                                    </div>

                                    <span className="col3">
                                        (99)
                                    </span>
                                </div>
                                <div className="ratingrow d-flex aloign-items-center ">
                                    <span className="col1">
                                        4 Star
                                    </span>

                                    <div className="col2 mt-2">

                                            <div className="progress">
                                            <div className="progress-bar bg-warning" style={{width:"70%"}}>

                                            </div>
                                            </div>
                                    </div>

                                    <span className="col3">
                                        (69)
                                    </span>
                                </div>
                                <div className="ratingrow d-flex aloign-items-center ">
                                    <span className="col1">
                                        3 Star
                                    </span>

                                    <div className="col2 mt-2">

                                            <div className="progress">
                                            <div className="progress-bar bg-warning" style={{width:"20%"}}>

                                            </div>
                                            </div>
                                    </div>

                                    <span className="col3">
                                        (6)
                                    </span>
                                </div>
                                <div className="ratingrow d-flex aloign-items-center ">
                                    <span className="col1">
                                        2 Star
                                    </span>

                                    <div className="col2 mt-2">

                                            <div className="progress">
                                            <div className="progress-bar bg-warning" style={{width:"30%"}}>

                                            </div>
                                            </div>
                                    </div>

                                    <span className="col3">
                                        (9)
                                    </span>
                                </div>
                                <div className="ratingrow d-flex aloign-items-center ">
                                    <span className="col1">
                                        1 Star
                                    </span>

                                    <div className="col2 mt-2">

                                            <div className="progress">
                                            <div className="progress-bar bg-warning" style={{width:"50%"}}>

                                            </div>
                                            </div>
                                    </div>

                                    <span className="col3">
                                        (40)
                                    </span>
                                </div>
                             </div>


                             <br/>
                             <h6 className="mt-4 mb-4">Customer Reviews</h6>  

                             <div className="reviewsSection">
                                <div className="reviewsRow">
                                    <div className="row">
                                        <div className="col-sm-7 d-flex">
                                            <div className="d-flex  flex-column">

                                          
                                            <div className="userInfo d-flex align-items-center mb-3">
                                            <UserAvatarImgComponent img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" lg={true}/>

                                            <div className="info ps-3">
                                                <h6>Ashish Rao</h6>
                                                <span>25 minutes ago!</span>
                                            </div>
                                         </div>

                                         <Rating name="read-only" value={4.5} defaultValue={2.5} precision={0.5} readOnly />
                                         </div>
                                          
                                        </div>
                                        
                                        <div className="col-sm-5 d-flex align-items-center">
                                        <div className="ms-auto">
                                          <Button className="btn-blue btn-lg btn-big ms-auto "><FaReplyAll/>&nbsp; Reply</Button>
                                            
                                            </div> 
                                        </div>

                                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse
                                cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! </p>
                                    </div>
                                        
                                </div>

                                <div className="reviewsRow reply">
                                    <div className="row">
                                        <div className="col-sm-7 d-flex">
                                            <div className="d-flex  flex-column">

                                          
                                            <div className="userInfo d-flex align-items-center mb-3">
                                            <UserAvatarImgComponent img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" lg={true}/>

                                            <div className="info ps-3">
                                                <h6>Ashish Rao</h6>
                                                <span>25 minutes ago!</span>
                                            </div>
                                         </div>

                                         <Rating name="read-only" value={4.5} defaultValue={2.5} precision={0.5} readOnly />
                                         </div>
                                          
                                        </div>
                                        
                                        <div className="col-sm-5 d-flex align-items-center">
                                        <div className="ms-auto">
                                          <Button className="btn-blue btn-lg btn-big ms-auto "><FaReplyAll/>&nbsp; Reply</Button>
                                            
                                            </div> 
                                        </div>

                                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse
                                cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! </p>
                                    </div>
                                        
                                </div>

                                <div className="reviewsRow reply">
                                    <div className="row">
                                        <div className="col-sm-7 d-flex">
                                            <div className="d-flex  flex-column">

                                          
                                            <div className="userInfo d-flex align-items-center mb-3">
                                            <UserAvatarImgComponent img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" lg={true}/>

                                            <div className="info ps-3">
                                                <h6>Ashish Rao</h6>
                                                <span>25 minutes ago!</span>
                                            </div>
                                         </div>

                                         <Rating name="read-only" value={4.5} defaultValue={2.5} precision={0.5} readOnly />
                                         </div>
                                          
                                        </div>
                                        
                                        <div className="col-sm-5 d-flex align-items-center">
                                        <div className="ms-auto">
                                          <Button className="btn-blue btn-lg btn-big ms-auto "><FaReplyAll/>&nbsp; Reply</Button>
                                            
                                            </div> 
                                        </div>

                                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse
                                cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! </p>
                                    </div>
                                        
                                </div>

                                <div className="reviewsRow">
                                    <div className="row">
                                        <div className="col-sm-7 d-flex">
                                            <div className="d-flex  flex-column">

                                          
                                            <div className="userInfo d-flex align-items-center mb-3">
                                            <UserAvatarImgComponent img="https://mironcoder-hotash.netlify.app/images/avatar/02.webp" lg={true}/>

                                            <div className="info ps-3">
                                                <h6>Ashish Rao</h6>
                                                <span>25 minutes ago!</span>
                                            </div>
                                         </div>

                                         <Rating name="read-only" value={4.5} defaultValue={2.5} precision={0.5} readOnly />
                                         </div>
                                          
                                        </div>
                                        
                                        <div className="col-sm-5 d-flex align-items-center">
                                        <div className="ms-auto">
                                          <Button className="btn-blue btn-lg btn-big ms-auto "><FaReplyAll/>&nbsp; Reply</Button>
                                            
                                            </div> 
                                        </div>

                                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit repellendus expedita esse
                                cupiditate quos doloremque rerum, corrupti ab illum est nihil, voluptate ex dignissimos! </p>
                                    </div>
                                        
                                </div>

                             </div>

                            <br />
                             <h6 className="mt-4 mb-4">Add a Review</h6>  

                             <form className="reviewForm">
                                    <textarea placeholder="Write here" className="mb-4"></textarea>
                                    <Button className="w-100 btn-blue btn-lg btn-big">Submit Reply</Button>
                             </form>
                             
                         </div>


                    </div>
                    </div>   

                               
                </>
             )
}

export default ProductDetails;