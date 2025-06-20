import Button from '@mui/material/Button';
import {FaMinus} from 'react-icons/fa6'
import {FaPlus} from 'react-icons/fa6'
import { useState } from 'react';
import { useEffect } from 'react';

const QuantityBox=(props)=>{
    const [inputVal,setInputVal]=useState(1);


    useEffect(()=>{
      if(props?.value !== undefined && props?.value !== null && props?.value !=="") {
        setInputVal(parseInt(props?.value))
       
      }
     
    },[props?.value])

  

    const minus=()=>{
        if(inputVal>1) 
             setInputVal(inputVal-1);
    }
    const plus=()=>{
        setInputVal(inputVal+1);
    }
    useEffect(()=>{
      props?.quantity(inputVal)
      props?.selectedItem(props.item,inputVal)
    },[inputVal])
      return (
        <div className='quantityDrop d-flex align-items-center '>
             <Button  onClick={minus}><FaMinus/></Button>
             <input type="text" value={inputVal}></input>
             <Button onClick={plus}><FaPlus/></Button>
       </div>
      )
}
export default QuantityBox;
