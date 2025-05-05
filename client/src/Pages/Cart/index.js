import banner1 from '../../assets/images/product1.jpg'
import Rating from '@mui/material/Rating';
import {Link} from 'react-router-dom';
import QuantityBox from '../../Components/QuantityBox';
import {IoIosClose} from 'react-icons/io'
import Button from '@mui/material/Button'
import { IoCartSharp } from 'react-icons/io5';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';
import { IoBagCheckOutline } from "react-icons/io5";

import{loadStripe} from '@stripe/stripe-js';

const Cart=()=>{

    const context=useContext(MyContext);
    const[cartData,setCartData]=useState([]);
    const [productQuantity,setProductQuantity]=useState();

    const [baseUrl,setBaseUrl]=useState("http://localhost:4000");
    let[cartFields,setCartFields]=useState({});//obj ani
    const[changeQuantity,setChangeQuantity]=useState(0);
    const[selectedQuantity,setselectedQuantity]=useState();


    useEffect   (()=>{
        fetchDataFromApi('/api/cart').then((res)=>{
            setCartData(res);
            setselectedQuantity(res?.quantity)
        })
       

    },[])

   

    const quantity=(val)=>{
        setProductQuantity(val);
        setChangeQuantity(val)
    }
    const selectedItem=(item,quantityVal)=>{

        if(changeQuantity !==0){
            const user=JSON.parse(localStorage.getItem("user"));

            cartFields.productTitle=item?.productTitle
            cartFields.images=item?.images
            cartFields.rating=item?.rating
            cartFields.price=item?.price
            cartFields.quantity=quantityVal
            cartFields.subTotal=parseInt(item?.price * quantityVal)
            cartFields.productId=item?.id
            cartFields.userId=user?.userId


            editData(`/api/cart/${item?._id}`,cartFields).then((res)=>{

                    fetchDataFromApi('/api/cart').then((res)=>{
                        setCartData(res);
                    })

          })
        }
      

      
    }
    const removeItem=(id)=>{
            deleteData(`/api/cart/${id}`).then((res)=>{
                context.setAlertBox({
                    open:true,
                    error:false,
                    msg:"Item removed from Cart"
                })
            })

            fetchDataFromApi('/api/cart').then((res)=>{
                setCartData(res);
            })

            context.getCartData();
    }
    const checkout=async()=>{
        const stripe=await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

        const cartProducts=cartData.map((product)=>({
            productTitle:product?.productTitle,
            image:product?.images,
            price:product?.price,
            quantity:product?.quantity
        }))

        const userData=JSON.parse(localStorage.getItem("user"));

        const body={
            products:cartProducts,
            userId:userData?.userId
        }
        const response= await fetch(`http://localhost:4000/api/checkout`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })

        const session=await response.json();

        const result=stripe.redirectToCheckout({
            sessionId:session.id
        });
        if(result.error){
            console.log(result.error);
        }
    }

    return (
        <>
            <section className="section cartPage">
                <div className="container">
                    <div className='row'>
                    <h3 className="hd mb-2">Your Cart</h3>
                    <p>There are <b className='text-red'>{cartData?.length}</b> products in cart</p>
                        <div className='col-md-9 pe-5'>
                        

                    <div className="table-responsive">
                        <table className="table ">
                            <thead>
                            <tr>
                                <th width="35%">Product</th>
                                <th width="15%">Unit Price</th>
                                <th width="25%">Quantity</th>
                                <th width="15%">Subtotal</th>
                                <th width="10%">Remove</th>
                            </tr>
                            </thead>

                        
                        <tbody>

                            {
                                cartData?.length !== 0 && cartData?.map((item,index)=>{
                                    return(
                                        <tr>
                                        <td width="35%">
                                            <Link to={`/product/${item?.productId}`}>
                                            <div className='d-flex align-items-center cartItemimgWrapper'>
                                                <div className='imgWrapper'>
                                                <img src={`${baseUrl}/uploads/${item?.images}`} className='w-100' alt={item?.productTitle}/>
                                                </div>
    
                                                <div className='info px-3'>
                                                    <h6>{item?.productTitle.substr(0,30)+"..."}</h6>
                                                    <Rating className="mt-2 mb-2" name="read-only" value={item?.rating} readOnly precision={0.5} size="small"/>
                                                </div>
                                            </div>
                                            </Link>
                                        </td>
                                        <td width="10%">Rs {item?.price}</td>
                                        <td width="25%"><QuantityBox quantity={quantity} 
                                        item={item} selectedItem={selectedItem} value={item?.quantity}/></td>
                                        <td width="15%">Rs {item?.subTotal}</td>
    
                                        <td width="10%"> <span className='remove' onClick={()=>removeItem(item?._id)}><IoIosClose/></span></td>
                                        
                                    </tr>
                                    )
                                })
                            }
                                
                                
                            </tbody>
                            </table>
                    </div>
                        </div>
                        <div className='col-md-3 '>
                            <div className='card border p-3 cartDetails'>
                                    <h4>CARD TOTALS</h4>
                                    <div className='d-flex align-items-center mb-3'>
                                         <span>Subtotal</span>
                                          <span className='ms-auto text-red font-weight-bold'>
                                            Rs.

                                            {
                                                cartData?.length!==0 && cartData?.map(item =>parseInt(item.price)*item.quantity).reduce((total,value)=> total + value ,0)
                                            }
                                          </span>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                         <span>Shipping</span>
                                         <span className='ms-auto '><b>Free</b></span>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                            <span>Location</span>
                                            <span className='ms-auto  ' ><b>India</b></span>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                            <span>Total</span>
                                            <span className='ms-auto text-red font-weight-bold' >
                                            Rs.

                                                {
                                                    cartData?.length!==0 && cartData?.map(item =>parseInt(item.price)*item.quantity).reduce((total,value)=> total + value ,0)
                                                }
                                            </span>
                                    </div>
                                    
                                    <Button className='btn-blue btn-lg btn-big' onClick={checkout}><IoBagCheckOutline/> &nbsp; Checkout</Button>
                                    
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Cart;