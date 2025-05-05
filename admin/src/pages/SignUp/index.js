import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo2.png'
import { Mycontext } from '../../App';
import pattern from '../../assets/images/pattern.webp';
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";

import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";

import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaHome } from "react-icons/fa";
import { postData } from '../../utils/api';

import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const SignUp=()=>{
    const context=useContext(Mycontext);
    const[inputIndex,setInputIndex]=useState(null);

    const[isShowConfirmPassword,setIsShowConfirmPassword]=useState(false);

    const[isShowPassword,setIsShowPassword]=useState(false);
    const[isLoading,setIsLoading]=useState(false);

    const [formFields,setFormFields]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        isAdmin:true
    })
    const history=useNavigate();

    const focusInput=(index)=>{
        setInputIndex(index);
    }

    useEffect(()=>{
                // Hide header and sidebar when Login component mounts
                window.scrollTo(0, 0);  // This ensures the dashboard always starts at the top
        context.setIsHideSidebarAndHeader(true);
        return () => {
            context.setIsHideSidebarAndHeader(false);   // Cleanup function - show header and sidebar when component unmounts
        }
    },[]);

    const onChangeInput=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value  
        }))
    }
    const signUp=(e)=>{

        e.preventDefault();

        try{
            if(formFields.name===""){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Name cannot be blank"
                })
                return false;
            }
            if(formFields.email===""){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Email cannot be blank"
                })
                return false;
            }
            if(formFields.phone===""){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Number cannot be blank"
                })
                return false;
            }
            if(formFields.password===""){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"password cannot be blank"
                })
                return false;
            }
            if(formFields.confirmPassword !== formFields.password){
                context.setAlertBox({
                    open:true,
                    error:true,
                    msg:"Password not matched! Please enter again"
                })
                return false;
            }

            setIsLoading(true);

            postData("/api/user/signup",formFields).then((res)=>{
                if(res.status !==false){
                    context.setAlertBox({
                        open:true,
                        color:"success",
                        error:false,
                        msg:"Registered Successfully!"
                    });

                    setTimeout(()=>{
                        setIsLoading(false);
                        history('/login');
                    },200)
                }else{
                    setIsLoading(false);
                    context.setAlertBox({
                        open:true,
                        error:true,
                        msg:res.msg
                    });
                }
            })
    

                

                
        }catch(error){
            console.log(error);
            setIsLoading(false);
        }
    }
    return(
       <>
       <img src={pattern} className='loginPattern'/>
         <section className="loginSection signUpSection">

        <div className='row'>
            <div className='col-md-8 d-flex align-items-center justify-content-center flex-column part1'>
                    <h1>DISCOVER THE ULTIMATE <span className='text-sky'>HUB FOR FASHION</span> TO IGNITE PASSION</h1>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                         making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                          looked up one of the </p>

                          <div className='mt-3 w-100'> 
                            <Link to='/'><Button className='btn-blue btn-lg btn-big'><FaHome/> &nbsp; Go To Home</Button></Link>
                          </div>
            </div>

            <div className='col-md-4 pr-0'>
            <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={logo} width="65px"/>
                        <h5 >Register a New Account</h5>
                    </div>

                   <div className='wrapper mt-3 card border'>
                      <form onSubmit={signUp}>

                            <div className={`form-group  position-relative ${inputIndex ===0 && "focus"}`}>
                                    <span className='icon'><FaUserCircle/></span>
                                    <input type='text' className='form-control' placeholder='Enter your Name' autoFocus onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} name='name' onChange={onChangeInput}/>  
                            </div>

                            <div className={`form-group  position-relative ${inputIndex ===1 && "focus"}`}>
                                <span className='icon'><MdEmail/></span>
                                <input type='text' className='form-control' placeholder='Enter your email' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} name='email' onChange={onChangeInput} />  
                            </div>

                            <div className={`form-group  position-relative ${inputIndex ===2 && "focus"}`}>
                                    <span className='icon'><FaUserCircle/></span>
                                    <input type='text' className='form-control' placeholder='Enter your Number' autoFocus onFocus={()=>focusInput(2)} onBlur={()=>setInputIndex(null)} name='phone' onChange={onChangeInput}/>  
                            </div>

                        <div className={`form-group  position-relative ${inputIndex ===3 && "focus"}`}>
                             <span className='icon'><MdLock/></span>
                             <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control mt-4' placeholder='Enter your Password' onFocus={()=>focusInput(3)} onBlur={()=>setInputIndex(null)} name='password' onChange={onChangeInput} /> 
                          
                            <span className='toggleShowPassword' onClick={()=>setIsShowPassword(!isShowPassword)}>
                                {
                                    isShowPassword===true ?   <FaEye/> : <IoMdEyeOff/>
                                }
                              </span>
                       
                        </div>

                        <div className={`form-group  position-relative ${inputIndex ===4 && "focus"}`}>
                             <span className='icon'><IoShieldCheckmark/></span>
                             <input type={`${isShowConfirmPassword===true ? 'text' : 'password'}`} className='form-control mt-4' placeholder='Confirm your Password' onFocus={()=>focusInput(4)} onBlur={()=>setInputIndex(null)} name='confirmPassword' onChange={onChangeInput}/> 
                          
                            <span className='toggleShowPassword' onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                {
                                    isShowConfirmPassword===true ?   <FaEye/> : <IoMdEyeOff/>
                                }
                              </span>
                       
                        </div>

                        <FormControlLabel required control={<Checkbox />} label="I agree to the all Terms & Conditions" />

                        <div className='form-group '>
                            <Button type='submit' className="btn-blue btn-lg btn-big w-100 ">
                                {
                                    isLoading===true ?  <CircularProgress/> : " Sign Up"
                                }
                                </Button>
                        </div>
                        
                        <div className='form-group text-center mt-3'>
                            

                            <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                <span className='line'></span>
                                <span className='txt'>or</span>
                                <span className='line'></span>
                            </div>
                            <Button variant='outlined' className='w-100 btn-lg loginWithGoogle mb-0'> <span className='googleIcon'><FcGoogle/> </span>&nbsp; Continue With Google</Button>
                        </div>
                      </form>

                                <span className='text-center d-block mt-2'>
                                    Already had an account?
                                    <Link to={'/logIn'} className='link color ms-1'> Login</Link>
                                </span>
                    
                    </div> 

                    
            </div>
            </div>
        </div>

          
        </section>
       </>
    )
}
export default SignUp;