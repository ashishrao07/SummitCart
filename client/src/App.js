import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/Home';
import  Header from './Components/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import axios from 'axios';
import Footer from './Components/Footer';
import ProductModel from './Components/ProductModel';
import Listing from './Pages/Listing';
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn/index.js';
import SignUp from './Pages/SignUp/index.js';
import { fetchDataFromApi, postData } from './utils/api.js';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const MyContext=createContext();

function App() {
  

 const [countryList,setcountryList]=useState([]);
 const [selectedCountry,setselectedCountry]=useState('');
  //product zoom state
  const [isOpenProductModel,setisOpenProductModel]=useState({
    id:"",
    open:false
  });
  const [isHeaderFooterShow,setIsHeaderFooterShow]=useState(true);
  const[isLogin,setIsLogin]=useState(false);
  const [productData,setProductData]=useState([]);
  const[categoryData,setCategoryData]=useState([]);
  const[subcategoryData,setsubCategoryData]=useState([]);
  const [activeCat,setActivecat]=useState('');
  const[cartData,setCartData]=useState();
  const[addingInCart,setAddingInCart]=useState(false)
 
  const openProductDetailsModel=(id,status)=>{
    fetchDataFromApi(`/api/products/${id}`).then((res)=>{
      setProductData(res);
      setisOpenProductModel(status);
    })
  }
  const[user,setUser]=useState({
    name:"",
    email:"",
    userId:""
  })
  const[alertBox,setAlertBox]=useState({
    msg:'',
    color:'',
    open:false
  })

 useEffect(()=>{
  getCountry('https://countriesnow.space/api/v0.1/countries/');


  fetchDataFromApi("/api/category").then((res)=>{
    setCategoryData(res.categoryList);
    setActivecat(res.categoryList[0]?.name);
  })
  fetchDataFromApi("/api/subCat").then((res)=>{
    setsubCategoryData(res.subCategoryList);
  })

  fetchDataFromApi('/api/cart').then((res)=>{
    setCartData(res)
  })

 },[]);

 const getCartData=()=>{
  fetchDataFromApi('/api/cart').then((res)=>{
    setCartData(res)
  })
 }
 const getCountry= async(URL)=>{
  const responsive=await axios.get(URL).then((res)=>{
    setcountryList(res.data.data);
  })
 }

 const handleClose = (event,reason)=>{
  if (reason === 'clickaway') {
    return;
  }

 setAlertBox({
   open:false,

 })
}

 useEffect(()=>{
  isOpenProductModel.open === true &&
    fetchDataFromApi(`/api/products/${isOpenProductModel.id}`).then((res)=>{
      setProductData(res);
    })
 },[isOpenProductModel]);


 useEffect(()=>{

  const token =localStorage.getItem("token");
  if(token !==null && token !==""){
    setIsLogin(true);
    const userData=JSON.parse(localStorage.getItem("user"));

    setUser(userData);

  }else{
    setIsLogin(false);
  }

},[isLogin])

const addtoCart=(data)=>{

  getCartData();

  setAddingInCart(true);

  postData(`/api/cart/add`,data).then((res)=>{

    if(res.status !== false){
      if(res !==null && res !== undefined && res !== ""){
        setAlertBox({
          open:true,
          error:false,
          color:"success",
          msg:"Item is added to cart"
        })
        setTimeout(() => {
          setAddingInCart(false);
          
        }, 1000);


    } 
    }else{
      setAlertBox({
        open:true,
        error:true,
        msg:res.msg
      })
      setAddingInCart(false);
    }
      
  })
  

   
}

 const values={
  countryList,
  setselectedCountry,
  selectedCountry,
  isOpenProductModel,
  setisOpenProductModel,
  setIsHeaderFooterShow,
  isLogin,
  setIsLogin,
  categoryData,setCategoryData,
  subcategoryData,setsubCategoryData,
  activeCat,setActivecat,
  alertBox,setAlertBox,
  user,setUser,
  addtoCart,
  addingInCart,setAddingInCart,
  cartData,setCartData,
  getCartData



 }
  return (
          <>
         <BrowserRouter>
         <MyContext.Provider value={values}>

         <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                      onClose={handleClose}
                      severity={alertBox.color==='success'? 'success' : 'error'}
                      variant="filled"
                      sx={{ width: '100%' }}
                      className='snackbar'
                    >
                          {alertBox.msg}
                    </Alert>
              </Snackbar>
          {
            isHeaderFooterShow===true && <Header  />  
          }

            
         
           <Routes>
            <Route path="/" exact={true} element={<Home   />}/>
            <Route path="/products/category/:id" exact={true} element={<Listing/>}/>
            <Route path="/products/subCat/:id" exact={true} element={<Listing/>}/>
            <Route  path="/product/:id" exact={true} element={<ProductDetails/>}/>
            <Route  path="/cart" exact={true} element={<Cart/>}/>
            <Route  path="/signIn" exact={true} element={<SignIn/>}/>
            <Route  path="/signUp" exact={true} element={<SignUp/>}/>
            <Route path="/payment/complete/:session_id" exact={true} element={<Cart/>} />
            <Route path="/cancel" exact={true} element={<Cart />} />
           </Routes>

           {
            isHeaderFooterShow===true && <Footer/>  
          }
        
          {
                isOpenProductModel.open===true && <ProductModel data={productData} />
          }
           </MyContext.Provider>
         </BrowserRouter>
          </>  
  );
}

export default App;

export {MyContext};