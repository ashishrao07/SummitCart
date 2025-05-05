import { FaAngleDown } from "react-icons/fa6";
import  React, { useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { MyContext } from "../../App";


const CountryDropdown=()=>{
    const [isOpen,setisOpen]=useState(false);
    const[selectedTab,setselectedTab]=useState(null);
   const[countryList,setcountryList]=useState([]);

   useEffect(()=>{
    setcountryList(context.countryList);
   },[]);
   const filterList=(e)=>{
       const keyword=e.target.value.toLowerCase();
       if(keyword!==""){
       const list=countryList.filter((item)=>{
        return item.country.toLowerCase().includes(keyword);
       })
       setcountryList(list);
   }
else{
    setcountryList(context.countryList)
}}

   const context=useContext(MyContext);

    const selectCountry=(index,country)=>{
       setselectedTab(index);
       setisOpen(false);
       context.setselectedCountry(country);
     }
    return(
        <>
        <Button className='countryDrop' onClick={()=> setisOpen(true)} >
             <div className='info d-flex flex-column'>
                 <span className="label me-2">YOUR LOCATION</span>
                  <span className="name">{context.selectedCountry !==""? context.selectedCountry.length>10 ? context.selectedCountry?.substr(0,15)+'...':context.selectedCountry: "Select a Location"}</span> 
                                
            </div>
                   <span className="ml-auto"><FaAngleDown /></span>
        </Button>

      <Dialog  open={isOpen} onClose={()=>setisOpen(false)} className="locationModel" >
            <h4 className="mb-0">Choose your Delivery Location</h4>
            <p>Enter your address and we will specify the offer for your area</p>

          <Button className="close_" onClick={()=>setisOpen(false)}><MdOutlineClose/></Button>
                <div className='headerSearch w-100'>
                <input type='text'placeholder='Search your area' onChange={filterList}/>
               
               <Button><IoIosSearch/></Button>
         </div>   
      <ul className="countryList mt-3">
        {
             countryList?.length!==0 && countryList?.map((item,index)=>{
                return(
                    <li key={index} ><Button onClick={()=>selectCountry(index,item.country) } className={`${selectedTab===index ? 'active':''}`} >{item.country}</Button></li>
                )
                })
       }
        
      </ul>
    </Dialog>
    </>
    )
}
export default CountryDropdown;