
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { RiDrinks2Line } from "react-icons/ri";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";



const Navigation=(props)=>{

   const [isopenSidebarVal,setisopenSidebarVal]=useState(false);

     return (
        <>
             <nav >
            <div className='container'>
        <div className="row">
            <div className='col-sm-2 navPart1'>
                <div className="catWrapper">
                   <Button className='allCatTab align-items-center ' onClick={()=>setisopenSidebarVal(!isopenSidebarVal)} >
                    <span className="icon1 me-2"><IoIosMenu/></span>
                    <span class='text'>ALL CATEGORIES</span>
                    <span className="icon2 ms-2"> <FaAngleDown/></span>
                   </Button>
                   <div className={`sidebarNav ${isopenSidebarVal===true ? 'open':''}`} >
                        <ul>
                           <li> <Link to={'/'}><Button className="d-flex w-100">Men<FaAngleRight className='ml-auto icon'/> </Button></Link>
                                   <div className="submenu shadow">
                                        <Link to={'/'}><Button>Clothing</Button></Link> 
                                         <Link to={'/'}><Button>Footwear</Button></Link> 
                                         <Link to={'/'}><Button>watches</Button></Link> 
                                         <Link to={'/'}><Button>Clothing</Button></Link> 
                                         <Link to={'/'}><Button>Footwear</Button></Link> 
                                        <Link to={'/'}><Button>watches</Button></Link> 
                            
                                   </div>
                            </li>
                           <li> <Link to={'/'}><Button className="d-flex justify-content-between w-100">Women <FaAngleRight className='ml-auto'/></Button></Link>
                                    <div className="submenu shadow">
                                        <Link to={'/'}><Button>Clothing</Button></Link> 
                                        <Link to={'/'}><Button>Footwear</Button></Link> 
                                        <Link to={'/'}><Button>watches</Button></Link> 
                                        <Link to={'/'}><Button>Clothing</Button></Link> 
                                        <Link to={'/'}><Button>Footwear</Button></Link> 
                                        <Link to={'/'}><Button>watches</Button></Link> 
                            
                                     </div>
                           </li>
                           <li> <Link to={'/'}><Button>Beauty</Button></Link>
                           <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>
                           </li>
                           <li> <Link to={'/'}><Button>watches</Button></Link>
                           <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>                          
                           </li>
                           <li> <Link to={'/'}><Button>Kids</Button></Link></li>
                           <li> <Link to={'/'}><Button>Gifts</Button></Link></li>
                           <li> <Link to={'/'}><Button>Men</Button></Link></li>
                           <li> <Link to={'/'}><Button>Women</Button></Link></li>
                           <li> <Link to={'/'}><Button>Beauty</Button></Link></li>
                           <li> <Link to={'/'}><Button>watches</Button></Link></li>
                           <li> <Link to={'/'}><Button>Kids</Button></Link></li>
                           <li> <Link to={'/'}><Button>Gifts</Button></Link></li>
                        </ul>
                            
                   </div>
               </div>
           
            </div>
            <div className='col-sm-10 navPart2 d-flex align-items-center'>
            
               <ul className="list list-inline ml-auto">
                  <li className=" list-inline-item">
                     <Link to={'/'}><Button>Home</Button></Link> 
                      
                  </li>
                  {
                    props.navData?.length !== 0 && props.navData?.map((item,index)=>{
                         return(
                              <li className=" list-inline-item">
                              <Link to={`/products/subCat/${item?.id}`}><Button>{item?.subCat}</Button></Link>
                              <div className="submenu shadow">
                                     <Link to={'/'}><Button>Clothing</Button></Link> 
                                     <Link to={'/'}><Button>Footwear</Button></Link> 
                                     <Link to={'/'}><Button>watches</Button></Link> 
                                     
                                     
                                </div>
                           </li>
                         )
                    })
                  }
                  {/* <li className=" list-inline-item">
                     <Link to={'/'}><Button>Men</Button></Link>
                     <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                            
                       </div>
                  </li>
                  <li className="  list-inline-item"><Link to={'/'}><Button>Women</Button></Link>
                  <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>
                </li>
                  <li className=" list-inline-item"><Link to={'/'}><Button>Beauty</Button></Link>
                       <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                         </div>
                </li>
                  <li className="  list-inline-item"><Link to={'/'}><Button>watches</Button></Link>
                       <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>
                </li>
                  <li className="  list-inline-item"><Link to={'/'}><Button>Kids</Button></Link> 
                       <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>
                 </li>
                  <li className=" list-inline-item"><Link to={'/'}><Button>Gifts</Button></Link> 
                        <div className="submenu shadow">
                            <Link to={'/'}><Button>Clothing</Button></Link> 
                            <Link to={'/'}><Button>Footwear</Button></Link> 
                            <Link to={'/'}><Button>watches</Button></Link> 
                            
                       </div>
                 </li>
                  <li className=" list-inline-item"><Link to={'/'}><Button>Blog</Button></Link> </li>
                  <li className=" list-inline-item"><Link to={'/'}><Button>contact </Button></Link> </li> */}
                  
               </ul>
               
            </div>
            </div>
            </div>
        </nav>
        </>
     )
}
export default Navigation;