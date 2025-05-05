import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import logo from '../../assets/images/logo2.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';



const SignUp=()=>{
    
    const context=useContext(MyContext);
    const[isLoading,setIsLoading]=useState(false);
    const [formFields,setFormFields]=useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        isAdmin:false
    })
    const history=useNavigate();

    useEffect(()=>{
        context.setIsHeaderFooterShow(false);
    },[]);
    const onChangeInput=(e)=>{
        setFormFields(()=>({
            ...formFields,
            [e.target.name]:e.target.value  
        }))
    }
    const register=(e)=>{
        console.log(formFields)
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
            // if(formFields.confirmPassword !== formFields.password){
            //     context.setAlertBox({
            //         open:true,
            //         error:true,
            //         msg:"Password not matched! Please enter again"
            //     })
            //     return false;
            // }

            setIsLoading(true);

            postData("/api/user/signup",formFields).then((res)=>{
                console.log(res)
                if(res.status !==false){
                    context.setAlertBox({
                        open:true,
                        color:"success",
                        error:false,
                        msg:"Registered Successfully!"
                    });

                    setTimeout(()=>{
                        setIsLoading(false);
                        // history('/signIn');
                        window.location.href="/signIn";
                    },2000)
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
        <section className="section signInPage signUpPage">
            <div className="shape-bottom"> <svg  fill="#fff" id="Layer_1" x="0рх" у="0px" 
                  viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }}><path
                    class="st0" d="M1921,413.1v406.7H0V0.5h0.41228.1,598.3c30,74.4,80.8,130.6,152.5,168. 6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path></svg>

            </div>
             <div className="container">
                <div className=" box card  p-3 shadow border-0">
                    <div className="text-center">
                        <img src={logo} alt="logo"/>
                    </div>
                    
                    <form className="mt-3" onSubmit={register}> 
                    <h2 className="mb-4">SignUp</h2>

                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group ">
                            <TextField  label="Name" type="text" name="name" onChange={onChangeInput}  variant="standard" className="w-100"/>  
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group ">
                            <TextField  label="Phone No" type="text" name="phone" onChange={onChangeInput}  variant="standard" className="w-100"/>  
                        </div>
                        </div>
                    </div>


                        <div className="form-group ">
                            <TextField id="standard-basic" label="Email" type="email" name="email" onChange={onChangeInput}  variant="standard" className="w-100"/>  
                        </div>
                        <div className="form-group ">
                            <TextField id="standard-basic" label="Password" type="password " name="password" onChange={onChangeInput}  variant="standard" className="w-100"/>  
                        </div>
                        {/* <a className="border-effect cursor txt">Forgot Password ?</a> */}
                      
                        <div className="d-flex align-items-center mt-3 mb-3 ">
                            <div className="row w-100">
                                <div className="col-md-6">
                                <Button type="submit" className='btn-blue  w-100 btn-lg btn-big ' >
                                        {
                                                isLoading===true ?  <CircularProgress/> : " Sign Up"
                                         }
                                    </Button>
                                </div>
                                <div className="col-md-6 pe-0">

                                        <Link to="/"> <Button className=' btn-lg btn-big w-100 ms-3' variant="outlined" onClick={()=>context.setIsHeaderFooterShow(true)} >Skip</Button>
                                        </Link>
                                   </div>
                            </div>
                        
                        </div>

                        <p className="txt"><Link to={'/signIn'} className="border-effect">Already a user ?</Link> </p>
                        <h6 className="text-center mt-3 font-weight-bold">Or continue with other accounts</h6>

                           <Button className="loginwithgoogle" variant="outlined"><FcGoogle/></Button>

                    </form>
                </div>
            </div>    
        </section>
    )

}
export default SignUp;
 

