import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import Login  from './pages/Login';
import SignUp from './pages/SignUp';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Product';
import ProductUpload from './pages/Product/addProduct';
import EditProduct from './pages/Product/editProduct';
import CategoryAdd from './pages/Category/addCategory';
import SubCatAdd from './pages/Category/addSubCat';
import Category from './pages/Category/categoryList';
import SubCatList from './pages/Category/subCategoryList';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from "react-top-loading-bar";
import EditCategory from './pages/Category/editCategory';
import EditSubCategory from './pages/Category/editSubCat';
import { fetchDataFromApi } from './utils/api';


const Mycontext=createContext();

function App() {

   const [isToggleSidebar,setIsToggleSidebar]=useState(false);
   const[isLogin,setIsLogin]=useState(true);
   const[isHideSidebarAndHeader,setIsHideSidebarAndHeader]=useState(false);
  //  const [windowWidth,setWindowWidth]=useState(true);
    const [isOpenNav,setIsOpenNav]=useState(false);
    const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
      return savedTheme === 'dark' ? false : true; // true for light, false for dark
    });
    const [progress, setProgress] = useState(0);
    const [baseUrl,setBaseUrl]=useState("http://localhost:4000");
    const [catData,setCatData]=useState([]);
    const [subCatData,setSubCatData]=useState([]);

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

    const handleClose = (event,reason)=>{
      if (reason === 'clickaway') {
        return;
      }
  
     setAlertBox({
       open:false,

     })
    }
    
  
    useEffect(()=>{
      if(themeMode===true){
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('themeMode','light');
      }
      else{
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('themeMode','dark');
      }

    
    },[themeMode])

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

   

    // useEffect(()=>{

    //   const handleResize=()=>{
    //     setWindowWidth(window.innerWidth);
    //   };
    //     window.addEventListener('resize',handleResize);

    //     return ()=>{
    //       window.removeEventListener('resize',handleResize);
    //     }
    // },[])

    const openNav=()=>{
      setIsOpenNav(true)
    }

    

  useEffect(()=>{
    setProgress(20)    //loading bar top
    fetchCategory();
    fetchSubCategory();
  },[])
    
const fetchCategory=()=>{
  fetchDataFromApi(`/api/category`).then((res) => {
    setCatData(res);
    setProgress( 100)
  });
}
const fetchSubCategory=()=>{
  fetchDataFromApi(`/api/subCat`).then((res) => {
    setSubCatData(res);
    setProgress( 100)
  });
}
  const values={
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,setThemeMode,
    // windowWidth,setWindowWidth,
    openNav,setIsOpenNav,
   alertBox,setAlertBox,
   progress,setProgress,
   baseUrl,setBaseUrl,
   catData,
   fetchCategory,
   setSubCatData ,subCatData,
   fetchSubCategory,
   user,setUser
  }
  return (
    <BrowserRouter>
    <Mycontext.Provider value={values}>

    <LoadingBar
        color="#f11946"
        progress={progress} 
        onLoaderFinished={() => setProgress(0)}
        className='topLoadingBar'
      />
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
           isHideSidebarAndHeader !==true && 
              <Header/>
      } 
  
      <div className='main d-flex'>
        {
          isHideSidebarAndHeader !==true && 
           (
            <>
                {/* <div className={` sidebarOverlay d-none ${isOpenNav === true && 'show'}`} onClick={()=> setIsOpenNav(false)}> */}
                <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle': ''} ${isOpenNav === true ? 'open' : ''}`}>
              <Sidebar/>
            </div>
                {/* </div> */}
            </>
           )

        }
      
        <div className={`content ${isHideSidebarAndHeader===true && 'full'} ${isToggleSidebar === true ? 'toggle': ''}`}>
          <Routes>
        
            <Route path='/' exact={true} element={<Dashboard/>}/>
            <Route path='/dashboard' exact={true} element={<Dashboard/>}/>
            <Route path='/login' exact={true} element={<Login/>}/>
            <Route path='/signUp' exact={true} element={<SignUp/>}/>
            <Route path='/products' exact={true} element={<Products/>}/>
            <Route path='/product/details' exact={true} element={<ProductDetails/>}/>
            <Route path='/product/upload' exact={true} element={<ProductUpload/>}/>
            <Route path='/product/edit/:id' exact={true} element={<EditProduct/>}/>
            <Route path='/category' exact={true} element={<Category/>}/>
            <Route path='/category/add' exact={true} element={<CategoryAdd/>}/>
            <Route path='/category/edit/:id' exact={true} element={<EditCategory/>}/>
            <Route path='/subCategory/add' exact={true} element={<SubCatAdd/>}/>
            <Route path='/subCategory' exact={true} element={<SubCatList/>}/>
            <Route path='/subCategory/edit/:id' exact={true} element={<EditSubCategory/>}/>
          </Routes>
        </div>
      </div>

    </Mycontext.Provider>

    </BrowserRouter>
  );
}

export default App;
export {Mycontext};