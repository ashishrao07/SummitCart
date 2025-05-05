import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules'
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const HomeCat=(props)=>{

  
    /// featured categories ki background color edhi
    // const [itemBg,setItemBg]=useState([
    //     '#fffceb',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',
    //     '#feeceb',
    //     'feefea',
    //     '#ecffec',
    //     '#feefea',
    //     '#ecffec',
    //     '#feefea',
    //     '#fff3eb',
    //     '#fff3ff',
    //     '#f2fce4',

    // ]);
      return(
        <section className="homeCat">
        <div className="container">
            <h3 className="mb-4 hd"> Featured Categories</h3>
        <Swiper
                 slidesPerView={10}
                 spaceBetween={8}
                navigation={true}
                slidesPerGroup={3}
                modules={[Navigation]}
                className="mySwiper"
                     >
            {
               props.catData?.length > 0 && props.catData?.map((cat,index)=>{
                   return(
                    <SwiperSlide key={index}>
                      <Link to={`/products/category/${cat.id}`}>
                    <div className="item text-center cursor" style={{background:cat.color}}>
                        <img src={cat.images[0]}/>
                        <h6>{cat.name}</h6>
                    </div>
                    </Link>
                </SwiperSlide>
                   )
                })
            }
                        
                       

                       
          </Swiper>
        </div>
      </section>
    )
}
export default HomeCat;