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
import {useNavigate} from 'react-router-dom';
import { postData } from '../../utils/api';

import CircularProgress from '@mui/material/CircularProgress';



const Login=()=>{

    const context=useContext(Mycontext);
    const[inputIndex,setInputIndex]=useState(null);

    const[isShowPassword,setIsShowPassword]=useState(false);

    const[isLoading,setIsLoading]=useState(false);

    const [formFields,setFormFields]=useState({
        email:"",
        password:"",
        isAdmin:true
    })
    const history=useNavigate();

    const focusInput=(index)=>{
        setInputIndex(index);
    }
    const onChangeInput=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value  
        }))
    }
    useEffect(()=>{
                // Hide header and sidebar when Login component mounts
                window.scrollTo(0, 0);
        context.setIsHideSidebarAndHeader(true);
       
        return () => {
            context.setIsHideSidebarAndHeader(false);   // Cleanup function - show header and sidebar when component unmounts

           
        }
    },[]);

    const signIn=(e)=>{
        e.preventDefault();

        if(formFields.email===""){
            context.setAlertBox({
                open:true,
                error:true,
                msg:"Email cannot be blank"
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
        setIsLoading(true);
        postData("/api/user/signin",formFields).then((res)=>{
            try{
                console.log(res)
                    if(res.status !==false){
                        localStorage.setItem("token",res.token);

                        const user={
                            name:res.user?.name,
                            email:res.user?.email,
                            userId:res.user?.id
                        }
        
                        localStorage.setItem('user',JSON.stringify(user));
                        context.setUser({
                            name:res.user?.name,
                            email:res.user?.email
                        })
                        context.setAlertBox({
                            open:true,
                            color:"success",
                            error:false,
                            msg:"Logged In Successfully!"
                        });
                        setTimeout(()=>{
                            // history('/dashboard');
                            setIsLoading(false);
                            window.location.href="/dashboard";
                        },200)
                    }
                    else{
                        setIsLoading(false);
                        context.setAlertBox({
                            open:true,
                            error:true,
                            msg:res.msg
                        
                        })
                    }
                
            }catch(error){
                
                console.log(error);
                setIsLoading(false);
            }
        })
       
    }

    return(
       <>
       <img src={pattern} className='loginPattern'/>
         <section className="loginSection">
            <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={logo} width="65px"/>
                        <h5 >Login to Kunnu</h5>
                    </div>

                   <div className='wrapper mt-3 card border'>
                      <form onSubmit={signIn}>
                        <div className={`form-group  position-relative ${inputIndex ===0 && "focus"}`}>
                            <span className='icon'><MdEmail/></span>
                             <input type='text' className='form-control' placeholder='Enter your email' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} autoFocus name='email' onChange={onChangeInput}/>  
                             </div>
                        <div className={`form-group  position-relative ${inputIndex ===1 && "focus"}`}>
                             <span className='icon'><MdLock/></span>
                             <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control mt-4' placeholder='Enter your Password' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} name='password' onChange={onChangeInput} /> 
                          
                            <span className='toggleShowPassword' onClick={()=>setIsShowPassword(!isShowPassword)}>
                                {
                                    isShowPassword===true ?   <FaEye/> : <IoMdEyeOff/>
                                }
                              </span>
                       
                        </div>

                        <div className='form-group '>
                            <Button type='submit' className="btn-blue btn-lg btn-big w-100 ">
                            {
                                    isLoading===true ?  <CircularProgress/> : " Sign In"
                            }
                            </Button>
                        </div>
                        
                        <div className='form-group text-center mt-3'>
                            <Link to={'forgot-password'} className="link">FORGOT PASSWORD ?</Link>

                            <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                <span className='line'></span>
                                <span className='txt'>or</span>
                                <span className='line'></span>
                            </div>
                            <Button  variant='outlined' className='w-100 btn-lg loginWithGoogle mb-0'> <span className='googleIcon'><FcGoogle/> </span>&nbsp; Continue With Google</Button>
                        </div>
                      </form>
                    
                    </div> 

                    <div className='wrapper mt-3 card border footer p-3'>
                        <span className='text-center'>
                            Don't have an account?
                            <Link to={'/signUp'} className='link color ms-1'> Register</Link>
                        </span>
                    </div>
            </div>
        </section>
       </>
    )
}
 export default Login;