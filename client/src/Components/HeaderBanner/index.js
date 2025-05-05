import React from "react";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules'
import banner1 from '../../assets/images/slideBanner1.jpg'
import banner2 from '../../assets/images/slideBanner2.jpg'
import valentine from '../../assets/images/valentine.jpg'
const HomeBanner=()=>{
    // var settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows:true,
    //     autoplay:true
    //   };
    return(
       <div className="container mt-3">
         <div className="homeBannerSection">
         <Swiper
                 slidesPerView={1}
                 spaceBetween={15}
                navigation={true}
            
                loop={false}
                autoplayt={{
                    delay:2500,
                    disableOnInteraction:false,
                }}
                modules={[Navigation,Autoplay]}
                className="mySwiper"
                     >
                          
                <SwiperSlide>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/ss24_strapi_web_a966c2c903/ss24_strapi_web_a966c2c903.jpg' className="w-100"/>
                        
                    </div>
                </SwiperSlide>
               
                <SwiperSlide>
                    <div className="item">
                        <img src={banner1} className="w-100"/>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item">
                        <img src={banner2} className="w-100"/>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/static_web_Stop_Life_10feaf9320/static_web_Stop_Life_10feaf9320.png' className="w-100"/>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="item">
                        <img src={valentine} className="w-100"/>
                        
                    </div>
                </SwiperSlide>
                
                 {/* <Slider {...settings}>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/ss24_strapi_web_a966c2c903/ss24_strapi_web_a966c2c903.jpg' className="w-100" alt/>
                    </div>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/static_web_Stop_Life_10feaf9320/static_we.png' className="w-100" />
                    </div>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/static_web_Stop_Life_10feaf9320/static_web_Stop_Life_10feaf9320.png' className="w-100" />
                    </div>
                    <div className="item">
                        <img src='https://cmsimages.shoppersstop.com/static_web_Stop_Life_10feaf9320/static_web_Stop_Life_10feaf9320.png' className="w-100" />
                    </div>
                 </Slider> */}
                 </Swiper>
        </div>
       </div>
    )
}
export default HomeBanner;