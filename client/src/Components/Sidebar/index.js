import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'
import { useContext, useEffect, useState } from 'react';
import happyhour from '../../assets/images/happyhour.jpg'
import { Link } from 'react-router-dom';   
import { MyContext } from '../../App.js';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Rating from '@mui/material/Rating';

import { useParams } from 'react-router-dom';


const Sidebar=(props)=>{
    const [value,setValue]=useState([100,60000]);
    const [value2,setValue2]=useState(0);
    const [filterSubCat, setFilterSubCat] = useState();
    const[subCatId,setSubCatId]=useState('');

    const context=useContext(MyContext);

    const {id}=useParams();

    useEffect(()=>{
        setSubCatId(id);
    },[id])

    const handleChange = (event) => {
        setFilterSubCat(event.target.value);
        props.filter(event.target.value)
        setSubCatId(event.target.value);
    };
   useEffect(()=>{
    props.filterByPrice(value,subCatId);
   },[value]);

   const filterByRating=(rating)=>{
    props.filterByRating(rating,subCatId);
   }
    return(
       <>
           <div className='sidebar'>
              
                <div className='filterBox '>
                    <h6>PRODUCT CATEGORIES</h6>

                     <div className='scroll'>

                         <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={filterSubCat}
                            onChange={handleChange}
                        >
                             {
                                context.subcategoryData?.length !== 0 && context.subcategoryData?.map((item,index)=>{
                                    return(

                                             <FormControlLabel value={item?.id} control={<Radio />} label={item?.subCat} />
                                        
        

                                    )
                                })
                            }
                           

                        </RadioGroup>
                          <ul>                           
                          
                          </ul>
                     </div>
                </div>

                <div className='filterBox '>

                    <h6>FILTER BY PRICE</h6>

                     <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5}/>

                     <div className='d-flex pt-2 pb-2 priceRange'>
                        <span> min: <strong className='text-dark'>Rs: {value[0]}</strong></span>
                        <span className='ms-auto'> max: <strong className='text-dark'>Rs: {value[1]}</strong></span>
                     </div>


                    
                </div>
                {/* <div className='filterBox '>
                    <h6>PRODUCT STATUS</h6>

                     <div className='scroll'>
                          <ul>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="In-Stock" />

                            </li>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="On Sale" />

                            </li>
                            
                          </ul>
                     </div>
                </div> */}

                <div className='filterBox '>
                    <h6>FILTER BY RATING</h6>

                     <div className='scroll ps-0'>


                          {/* <ul>
                          <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="STARBUCKS" />

                            </li>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="US-POLO" />

                            </li>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="AMUL" />

                            </li>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="BUDWISER" />

                            </li>
                            <li>
                                <FormControlLabel className='w-100' control={<Checkbox defaultChecked />} label="COCO-COLA" />

                            </li>
                            
                          </ul> */}

                          <ul>
                            <li onClick={()=>filterByRating(5)}>
                            <Rating name="read-only" value={5} readOnly size='small'  />
                            </li>
                            <li onClick={()=>filterByRating(4)}>
                            <Rating name="read-only" value={4} readOnly size='small' />
                            </li>
                            <li onClick={()=>filterByRating(3)}>
                            <Rating name="read-only" value={3} readOnly size='small'  />
                            </li>
                            <li onClick={()=>filterByRating(2)}>
                            <Rating name="read-only" value={2} readOnly size='small'/>
                            </li>
                            <li onClick={()=>filterByRating(1)}>
                            <Rating name="read-only" value={1} readOnly size='small' />
                            </li>

                          </ul>
                                

                                    
                     </div>
                </div>
                
                <Link to="#"><img src={happyhour} className='w-100'/></Link>
             </div>
       </>
    )
}
export default Sidebar;
