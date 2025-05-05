import logo from '../../assets/images/logo2.png';
import { Link } from "react-router-dom";
import CountryDropdown from '../countryDropdown/index.js'

import Button from '@mui/material/Button';
import { FaRegUser } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import SearchBox from './SearchBox/index.js';
import Navigation from '../Navigation/index.js';
import { useContext, useState } from 'react';
import { MyContext } from '../../App.js';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { IoBagCheckSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";






const Header=()=>{
    const context=useContext(MyContext);
    const [anchorEl, setAnchorEl] = useState    (null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout=()=>{
        setAnchorEl(null);
        localStorage.clear();

        context.setIsLogin(false);
    }

   return (
    <>
        <div className="headerwrapper">
            <div className="top-strip bg-blue">
                <div className="container">
                    <p className="mt-0 mb-0 text-center  " > Due some <b >Technical Reasons</b> Order may be proccessed with a slight delay</p>
                </div>
            </div>
        
   <header className="header">
        <div className="container">
              <div className='row'>
                   <div className="logoWrapper d-flex align-items-center col-sm-2">
                          <Link to={'/'}><img src={logo} alt="logo"/></Link>
                   </div>
                   <div className='col-sm-10 d-flex align-items-center part2'>
                      {
                        context.countryList.length !==0 &&  <CountryDropdown />
                      }  
                       
                          {/* header search here*/}
                          <SearchBox/>
                          {/* header search ends here*/}
                    <div className='part3 d-flex align-items-center ml-auto'>
                        {
                            context.isLogin!==true? <Link to='/signIn'><Button className='btn-teal btn-lg btn-big btn-round'>SignIn</Button></Link> :

                            <>
                            <Button className='user' onClick={handleClick}> < FaRegUser/></Button>
                                    <Menu
                                            anchorEl={anchorEl}
                                            id="accDrop"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            // slotProps={{
                                            // paper: {
                                            //     elevation: 0,
                                            //     sx: {
                                            //     overflow: 'visible',
                                            //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            //     mt: 1.5,
                                            //     '& .MuiAvatar-root': {
                                            //         width: 32,
                                            //         height: 32,
                                            //         ml: -0.5,
                                            //         mr: 1,
                                            //     },
                                            //     '&::before': {
                                            //         content: '""',
                                            //         display: 'block',
                                            //         position: 'absolute',
                                            //         top: 0,
                                            //         right: 14,
                                            //         width: 10,
                                            //         height: 10,
                                            //         bgcolor: 'background.paper',
                                            //         transform: 'translateY(-50%) rotate(45deg)',
                                            //         zIndex: 0,
                                            //     },
                                            //     },
                                            // },
                                            // }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                           
                                            {/* <MenuItem onClick={handleClose}>
                                            <Avatar className='me-2'/> My Account
                                            </MenuItem>
                                            <Divider/> */}
                                               <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <FaUserAlt  />
                                            </ListItemIcon>
                                                    My Account
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <IoBagCheckSharp  />
                                            </ListItemIcon>
                                                    My Orders
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <FaHeart fontSize="medium" />
                                            </ListItemIcon>
                                              My List
                                            </MenuItem>
                                            <MenuItem onClick={logout}>
                                            <ListItemIcon>
                                                <Logout  />
                                            </ListItemIcon>
                                            Logout
                                            </MenuItem>
                                        </Menu>
                            </>

                            

                        }
                        
                    <div className='ms-2 me-2 cartTab d-flex align-items-center'>
                                    <span className='price'>
                                        Rs.
                                        {
                                                    context.cartData?.length!==0 ? context.cartData?.map(item =>parseInt(item.price)*item.quantity).reduce((total,value)=> total + value ,0) : 0
                                       }
                                    </span>
                                    <div className='position-relative ml-2'>
                                    <Link to={'/cart'} > <Button className='user ms-3' >  < GiShoppingCart/></Button> </Link>
                                    <span className='count d-flex align-items-center justify-content-center'>{context.cartData?.length}</span>
                                    </div>
                                </div>
                               </div>
                   </div>
                   

                                   </div>
                              </div>
        </header>

        {
            context.subcategoryData?.length !== 0 &&   <Navigation navData={context.subcategoryData}/>
        }

      
    </div>
    
    </>
   )
}
export default Header;