import ProductZoom from '../../Components/ProductZoom'
import Rating from '@mui/material/Rating';
import QuantityBox from '../../Components/QuantityBox';
import Button from '@mui/material/Button';
import { BsCart4 } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {FaRegHeart} from 'react-icons/fa';
import { MdCompareArrows } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import banner4 from '../../assets/images/banner4.PNG'
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi, postData } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';



const ProductDetails=()=>{
    const[activeTabs,setActiveTabs]=useState(0)
     const [activeSize,setActiveSize]=useState(null);
     const[productData,setProductData]=useState([]);
     const[relatedProductData,setRelatedProductData]=useState([]);
     const[recentlyViewedProduct,setRecentlyViewedProduct]=useState([]);
     let[cartFields,setCartFields]=useState({});//obj ani
     const [productQuantity,setProductQuantity]=useState();
     const[tabError,setTabError]=useState(null);
     

     const isActive=(index)=>{
        setActiveSize(index);
        setTabError(false);

     }
     const {id}=useParams();
     const context=useContext(MyContext);

     useEffect(()=>{
        window.scrollTo(0,0);
        setActiveSize(null);
        fetchDataFromApi(`/api/products/${id}`).then((res)=>{
            setProductData(res);

            fetchDataFromApi(`/api/products?subCatId=${res?.subCatId}`).then((res)=>{
                    const filteredData=res?.products?.filter(item=>item.id !== id);
                    setRelatedProductData(filteredData);

            })

            

                fetchDataFromApi(`/api/products/recentlyViewed`).then((response)=>{

                    setRecentlyViewedProduct(response);
    
                })
                postData(`/api/products/recentlyViewed`,res);

                //okavela product ki size & weight & rams m lakapoina adhi cart lo add cheyyachu
                if(productData?.productRAMS === undefined && productData?.productWEIGHT === undefined && productData?.productSIZE === undefined) {
                    setActiveSize(1);     
                }

        })
          
     },[id])

     const quantity=(val)=>{
            setProductQuantity(val);
     }

     const addtoCart=()=>{


        if(activeSize !== null){

            
            const user=JSON.parse(localStorage.getItem("user"));

            cartFields.productTitle=productData?.name
            cartFields.images=productData?.images[0][0]
            cartFields.rating=productData?.rating
            cartFields.price=productData?.price
            cartFields.quantity=productQuantity
            cartFields.subTotal=parseInt(productData?.price * productQuantity)
            cartFields.productId=productData?.id
            cartFields.userId=user?.userId

    
            context.addtoCart(cartFields);
        }else{
            setTabError(true);
        }
      
     }
     const selectedItem=()=>{

     }

    return(
        <section className='productDetails section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <ProductZoom images={productData?.images} discount={productData?.discount}/>
              </div>
               <div className='col md-7 ps-5 pe-4'>
                    <h2 className='hd text-capitalize'>{productData?.name}</h2>
                <ul className='list list-inline d-flex align-items-center'>
                    
                    <li className='list-inline-item'>
                    <div className='d-flex align-items-center'>
                        <span className='text-light me-2'>Brands :</span>
                        <span>{productData?.brand}</span>
                        </div>
                        </li>
                    <li className='list-inline-item'>
                      <div className='d-flex align-items-center'>
                         <Rating className="mt-2 mb-2" name="read-only" value={parseInt(productData?.rating)} readOnly precision={0.5} size="small"/>
                         <span className='text-light ms-2'> 1 Review </span>
                      </div>
                    </li>
                </ul>
                <div className="d-flex info mb-3">
                     <span className="oldPrice ">Rs {productData?.oldPrice}</span>
                         <span className="netPrice text-danger ms-2">Rs {productData?.price}</span>
                     
                 </div>
                 <span className=" badge bg-success ">In Stock</span>
                 <p className='mt-2'>{productData?.description} </p>

                 {
                             productData?.productRAMS?.length !==0 && 
                             <div className='productSize d-flex align-items-center'>
                            <span>RAM :</span>
                            <ul className={`list list-inline mb-0 ps-4  ${tabError === true && 'error'}`}> 
                                {
                                       productData?.productRAMS?.map((item,index)=>{
                                        return(
                                             <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active':''}`}
                                              onClick={()=>isActive(index)}>{item}</a></li>
                                        )
                                })
                                }
                           </ul>
                            </div>

                 }
                 {
                             productData?.productSIZE?.length !==0 && 
                             <div className='productSize d-flex align-items-center'>
                            <span>Size / Weight :</span>
                            <ul className={`list list-inline mb-0 ps-4  ${tabError === true && 'error'}`}>
                                {
                                       productData?.productSIZE?.map((item,index)=>{
                                        return(
                                             <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active':''}`}
                                              onClick={()=>isActive(index)}>{item}</a></li>
                                        )
                                })
                                }
                           </ul>
                            </div>

                 }

{
                             productData?.productWEIGHT?.length !==0 && 
                             <div className='productSize d-flex align-items-center'>
                            <span>Size / Weight :</span>
                            <ul className={`list list-inline mb-0 ps-4  ${tabError === true && 'error'}`}>
                                {
                                       productData?.productWEIGHT?.map((item,index)=>{
                                        return(
                                             <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active':''}`}
                                              onClick={()=>isActive(index)}>{item}</a></li>
                                        )
                                })
                                }
                           </ul>
                            </div>

                 }

                        {/* <div className='productSize d-flex align-items-center'>
                            <span>Size / Weight :</span>
                                <ul className='list list-inline mb-0 ps-4'>
                                    
                                    <li className='list-inline-item'><a className={`tag ${activeSize === 1 ? 'active':''}`} onClick={()=>isActive(1)}> 100g</a></li>
                                    <li className='list-inline-item'><a className={`tag ${activeSize === 2 ? 'active':''}`} onClick={()=>isActive(2)}> 200g</a></li>
                                    <li className='list-inline-item'><a className={`tag ${activeSize === 3 ? 'active':''}`} onClick={()=>isActive(3)}> 300g</a></li>
                                    <li className='list-inline-item'><a className={`tag ${activeSize === 4 ? 'active':''}`} onClick={()=>isActive(4)}> 500g</a></li>
                                </ul>
                    </div>
                  */}
            
              
                    <div className='d-flex align-items-center mt-3'>
                        <QuantityBox quantity={quantity} selectedItem={selectedItem}/>
                        <Button className='btn-blue btn-lg btn-round btn-big ms-4' onClick={addtoCart}>
                            <BsCart4/>&nbsp;
                            {
                                context.addingInCart===true ? "adding...." : " Add to Cart "
                            }
                         </Button>
                        <Tooltip title='Add to Wishlist' placement='top-start'>
                        <Button className='btn-blue btn-lg btn-big  btn-circle ms-3'><FaRegHeart/></Button>
                        </Tooltip>
                        <Tooltip title='compare' placement='top-start'>
                        <Button className='btn-blue btn-lg btn-big  btn-circle ms-2'><MdCompareArrows /></Button>
                        </Tooltip>
                    </div>
                    </div>
                </div>

                <br/>
                <div className='card mt-5 p-5 detailsPageTabs'>
                    <div className='customTabs'>
                        <ul className='list list-inline'>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs===0 && 'active'}`} onClick={()=>{setActiveTabs(0)}}>Description</Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs===1 && 'active'}`} onClick={()=>{setActiveTabs(1)}}>Additional Info</Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button className={`${activeTabs===2 && 'active'}`} onClick={()=>{setActiveTabs(2)}}>Reviews (3)</Button>
                            </li>
                        </ul>

                        <br/>
                        {
                            activeTabs===0 && <div className='tabContent'>
                                <p>{productData?.description}</p>
                            </div>
                        }
                        {
                            activeTabs===1 && <div className='tabContent'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr class='stand-up'>
                                                <th>Stand Up</th>
                                                <td>
                                                    <p>35"l x 24'w x 37-45'H(front to back wheel)</p>
                                                </td>
                                            </tr>
                                            <tr class='folded-wo-wheels'>
                                                <th>folded(w/o wheels)</th>
                                                <td>
                                                    <p>32.5"l x 18.5"w x 16.5"H</p>
                                                </td>
                                            </tr>
                                            <tr class='door-pass-through'>
                                                <th>Door-pass-through</th>
                                                <td>
                                                    <p>69</p>
                                                </td>
                                            </tr>
                                            <tr class='frame'>
                                                <th>Frame</th>
                                                <td>
                                                    <p>Aluminum</p>
                                                </td>
                                            </tr>
                                            <tr class='weight-wo-wheels'>
                                                <th>weight-wo-wheels</th>
                                                <td>
                                                    <p>20 LBS</p>
                                                </td>
                                            </tr>
                                            <tr class='weight-capacity'>
                                                <th>weight-capacity</th>
                                                <td>
                                                    <p>69 LBS</p>
                                                </td>
                                            </tr>
                                            <tr class='width'>
                                                <th>Width</th>
                                                <td>
                                                    <p>24</p>
                                                </td>
                                            </tr>
                                            <tr class='wheels'>
                                                <th>Wheels</th>
                                                <td>
                                                    <p>12 air/wide track slick tread</p>
                                                </td>
                                            </tr>
                                            <tr class='seat-back-height'>
                                                <th>seat-back-height</th>
                                                <td>
                                                    <p>21.3</p>
                                                </td>
                                            </tr>
                                            
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        {
                            activeTabs===2 && 
                            <div className='tabContent'>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h3>Customer Questions & Answers</h3>
                                        <br/>
                                       <div className='card p-4 reviewsCard flex-row'>
                                          <div className='image'>
                                            <div className='rounded-circle'>
                                                <img  src={banner4} alt='img'/>
                                            
                                            </div>
                                            <span className='text-g d-block text-center font-weight-bold'>Ashish Rao</span>
                                          </div>
                                          <div className='info ps-5'>
                                            <div className='d-flex align-items-center w-100'>
                                                <h5 className='text-light'>02/06/2003</h5>
                                                <div className='ms-auto'>
                                                    <Rating name='half-rating-read' value={4.5} precision={0.5} readOnly size='small'/>
                                                </div>
                                            </div>
                                            <p>{productData?.description}</p>
                                          </div>
                                        </div> 
                                        <br className='res-hide' />
                                        <br className='res-hide' />

                                        <form className='reviewForm'>
                                            <h4> Add a Review</h4> 
                                            <div className='form-group'>
                                                <textarea className='form-control' placeholder='Write a Review' name='review'>

                                                </textarea>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='form-group'>
                                                        <input type='text' className='form-control' placeholder='Name' name='username'/>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <Rating name='rating' value={4.5} precision={0.5}/>
                                                </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className='form-group '>
                                                <Button type='submit' className='btn-blue btn-lg btn-big btn-round '>Submit review</Button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-md-4 ps-5 reviewBox'>
                                        <h4>Customer Reviews</h4>
                                        <div className='d-flex alig-items-center ms-2'>
                                        <Rating name='half-rating-read' value={4.5} precision={0.5} readOnly />
                                        </div>
                                        <br/>
                                        <div className='progressBarBox d-flex align-items-center '>
                                            <span class='mr-3'>5 Star</span>
                                            <div className='progress' style={{width:'78%',height:'20px'}}>
                                                <div className='progress-bar bg-success' style={{width:'75%',height:'20px'}}>75%</div>
                                            </div>
                                        </div>

                                        <div className='progressBarBox d-flex align-items-center '>
                                            <span class='mr-3'>4 Star</span>
                                            <div className='progress' style={{width:'78%',height:'20px'}}>
                                                <div className='progress-bar bg-success' style={{width:'50%',height:'20px'}}>50%</div>
                                            </div>
                                        </div>

                                        <div className='progressBarBox d-flex align-items-center '>
                                            <span class='mr-3'>3 Star</span>
                                            <div className='progress' style={{width:'78%',height:'20px'}}>
                                                <div className='progress-bar bg-success' style={{width:'55%',height:'20px'}}>55%</div>
                                            </div>
                                        </div>

                                        <div className='progressBarBox d-flex align-items-center '>
                                            <span class='mr-3'>2 Star</span>
                                            <div className='progress' style={{width:'78%',height:'20px'}}>
                                                <div className='progress-bar bg-success' style={{width:'35%',height:'20px'}}>35%</div>
                                            </div>
                                        </div>

                                        <div className='progressBarBox d-flex align-items-center '>
                                            <span class='mr-3'>1 Star</span>
                                            <div className='progress' style={{width:'78%',height:'20px'}}>
                                                <div className='progress-bar bg-success' style={{width:'25%',height:'20px'}}>25%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                <br/>
                {


                    relatedProductData?.length !==0 &&  <RelatedProducts title="RELATED PRODUCTS" data={relatedProductData}/>
                }

                {
                    recentlyViewedProduct?.length!==0 && <RelatedProducts title="RECENTLY VIEWED PRODUCTS" itemView={"recentlyView"} data={recentlyViewedProduct}/>
                }
                
            </div>
        </section>
    )
}
export default ProductDetails;
