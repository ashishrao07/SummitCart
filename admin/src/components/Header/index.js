import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo2.png'
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdOutlineLightMode } from "react-icons/md";

import { MdDarkMode } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { BsBell } from "react-icons/bs";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider  from "@mui/material/Divider";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import React ,{ useContext, useState } from "react";

import { GoShieldLock } from "react-icons/go";
import { Mycontext } from "../../App";
import UserAvatarImgComponent from "../userAvatarImg";

import { IoMdMenu } from "react-icons/io";




const Header=()=>{
    const [anchorEl, setAnchorEl] =useState(null);
    const[isOpennotificationDrop,setisOpennotificationDrop]=useState(false)
    const openMyAcc = Boolean(anchorEl);
    const openNotifications = Boolean(isOpennotificationDrop);


    const context=useContext(Mycontext);

    

    const handleOpenMyAccDrop = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleOpennotificationdrop=()=>{
      setisOpennotificationDrop(true);
    }
    const handleClosenotificationdrop=()=>{
      setisOpennotificationDrop(false);
    }

    const history=useNavigate();

      const logout=()=>{
        localStorage.clear();

        setAnchorEl(null);
        context.setAlertBox({
          open:true,
          color:"success",
          msg:"Log out successful!"
        })
        setTimeout(() => {
          history('/login');
        }, 200);
        
      }
    return(
        <>
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center w-100 flex-row">
                    {/* Logo wrapper */}
                    <div className="col-sm-2 part1">
                        <Link to={'/'} className="d-flex align-items-center logo" >
                        <img src={logo} />
                        <span className="ms-2">AsHisH</span>
                        </Link>
                    </div>

                    
                   
                            <div className="col-sm-3 d-flex align-items-center part2 ">
                                <Button className="rounded-circle me-3" onClick={()=>context.setIsToggleSidebar(! context.isToggleSidebar)}>
                                  {
                                    context.isToggleSidebar===false ?  <MdMenuOpen/> : <MdOutlineMenu/>
                                  }
                                
                                  </Button>
                              <SearchBox/>
                        </div>
                    
                  
                    <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ps-4">
                    <Button className="rounded-circle me-3" onClick={()=>context.setThemeMode(!context.themeMode)}>
                          <MdOutlineLightMode/>
                      </Button>
                    <Button className="rounded-circle me-3 res-hide"><IoMdCart/></Button>
                      

                    <Button className="rounded-circle me-3 res-hide"><MdOutlineMail/></Button>
                    <Button className="rounded-circle me-3 " onClick={handleOpennotificationdrop}><BsBell/></Button>

                    {/* <Button className="rounded-circle me-3 " onClick={()=> context.openNav()}><IoMdMenu/></Button> */}

                    <div className="dropdownWrapper position-relative">
                       <Menu
                              anchorEl={isOpennotificationDrop}
                              className="notifications dropdown_list"
                              id="notifications"
                              open={openNotifications}
                              onClose={handleClosenotificationdrop}
                              onClick={handleClosenotificationdrop}
                              
                              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                              <div className="head ps-3 pb-0">
                              <h4>Notifications</h4>
                              </div>
                              <Divider className="mb-1"/>
                                <div className="scroll">
                                      <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <UserAvatarImgComponent img={"https://mironcoder-hotash.netlify.app/images/avatar/01.webp"} />
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
                                    
                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>

                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={handleClosenotificationdrop}>
                                        <div className="d-flex ">
                                          <div>
                                          <div className="userImg">
                                              <span className="rounded-circle">
                                                  <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"/>
                                              </span>
                                          </div>
                                          </div>
                                          <div className="dropdownInfo">
                                            <h4>
                                              <span>
                                                <b>Priya </b>
                                                added to his favorite list <b>Leather belt steve madden</b>
                                              </span>
                                            </h4>
                                            <p className="text-sky mb-0">
                                              few seconds ago
                                            </p>
                                          </div>
                                        </div>
                                    </MenuItem>
              
          </div>
           <div className="ps-2 pe-2 w-100 pt-1">
           <Button className="btn-blue w-100 ">View All Notifications</Button>

           </div>
         </Menu>
                    
           </div>

              {
                context.isLogin !==true ? <Link to={'/Login'}> <Button className="btn-blue btn-lg me-2">Sign In</Button> </Link>
                
                :

                <div className="myAccWrapper">
                <Button className="myAcc d-flex align-items-center " onClick={handleOpenMyAccDrop}>
                <div className='userImg'>
                        <span className="rounded-circle">
                              {context.user?.name.charAt(0)}
                        </span>       
                  </div>

                    <div className="userInfo res-hide">
                        <h4>{context.user?.name}</h4>
                        <p className="mb-0">{context.user?.email}</p>
                    </div>
                </Button>
                      <Menu

                          anchorEl={anchorEl}
                          id="account-menu"
                          open={openMyAcc}
                          onClose={handleClose}
                          onClick={handleClose}
                          // slotProps={{
                          //   paper: {
                          //     elevation: 0,
                          //     sx: {
                          //       overflow: 'visible',
                          //       filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          //       mt: 1.5,
                          //       '& .MuiAvatar-root': {
                          //         width: 32,
                          //         height: 32,
                          //         ml: -0.5,
                          //         mr: 1,
                          //       },
                          //       '&::before': {
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
                          //       },
                          //     },
                          //   },
                          // }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >

                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                              My account 
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <GoShieldLock  />
                          </ListItemIcon>
                          Reset Password
                        </MenuItem>
                        <MenuItem onClick={logout} >
                          <ListItemIcon>
                            <Settings fontSize="small" className="text-danger"/>
                          </ListItemIcon>
                          <span className="text-danger">
                          <b> Logout </b>
                          </span>
                        </MenuItem>
                 </Menu>
               </div>

              }
           

                      

                    </div>
                </div>
            </div>
        </header>
        </>
    )
};
export default Header;