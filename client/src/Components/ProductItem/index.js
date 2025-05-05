import Rating from '@mui/material/Rating';
import { SlSizeFullscreen } from "react-icons/sl";
import Button from '@mui/material/Button';
import { IoMdHeartEmpty } from "react-icons/io";
import ProductModel from '../ProductModel';
import { useState,useContext, useRef } from 'react';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductItem=(props)=>{

    const[isHovered,setIsHovered]=useState(false);
    const [baseUrl,setBaseUrl]=useState("http://localhost:4000");

    const sliderRef=useRef();

    var settings={
        dots:true,
        infinite:true,
        loop:true,
        speed:300,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true
    }

   const context=useContext(MyContext);

    const viewProductDetails=(id)=>{
        context.setisOpenProductModel({
            id:id,
            open:true
        });
    }

    const closeProductModel=()=>{
        context.setisOpenProductModel(false);
    }
    
    const handleMouseEnter=()=>{
        console.log(props.item?.images)
        setIsHovered(true);
        setTimeout(()=>{
            if(sliderRef.current){
                sliderRef.current.slickPlay();
            }
        },20);
    }
    const handleMouseLeave=()=>{
        setIsHovered(false);
        setTimeout(()=>{
            if(sliderRef.current){
                sliderRef.current.slickPlay();
            }
        },20);
    }


    return(
      <>  
        <div className={`productItem ${props.itemView}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="imageWrapper">
                <Link to={`/product/${props?.itemView === "recentView"? props?.item?.prodId : props?.item?.id}`}>
                    {

                        isHovered === true ? 
                        <Slider {...settings} ref={sliderRef}>
                            {
                                props.item?.images?.map((image,index)=>{
                                    return(
                                        <div className='slick-slide' key={index}>

                                        <LazyLoadImage
                                            alt={"Image"}
                                            effect="blur"
                                            className="w-100"
                                            src={`${baseUrl}/uploads/${image[0]}`}
                                            />
                                            
                                            {/* <img src={`${baseUrl}/uploads/${image[0]}`}className="w-100"/> */}
                                            
                                        </div>
                                    )
                                })
                            }
                        </Slider>

                        :
                        <LazyLoadImage
                                alt={"Image"}
                                effect="blur"
                                className="w-100"
                                src={`${baseUrl}/uploads/${props.item?.images[0][0]}`}
                                
                        />                 
                        
                        // <img src={`${baseUrl}/uploads/${props.item?.images[0][0]}`}className="w-100"/>
                    }
                </Link>
                
                <span class="badge bg-primary">{props?.item?.discount}%</span>
                    <div className="actions">
                        <Button onClick={()=>viewProductDetails(props?.item?.id)}><SlSizeFullscreen/></Button>
                        <Button><IoMdHeartEmpty style={{fontSize:'20px'}}/></Button>
                    </div>

           </div>
            <div className="info">
                 <Link to={'/products/1'}><h4>{props?.item?.name.substr(0,30)+'...'}</h4></Link>
                 <span className="text-success d-block">In Stock</span>
                 <Rating className="mt-2 mb-2" name="read-only" value={props?.item?.rating} readOnly precision={0.5} size="small"/>
                    <div className="d-flex">
                        <span className="oldPrice ">Rs {props?.item?.oldPrice}</span>
                        <span className="newPrice text-danger ms-2"> Rs {props?.item?.price}</span>

                    </div>
            </div>
   
        </div>
     
 </>
    )
}
export default ProductItem;