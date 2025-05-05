import Button from '@mui/material/Button';
import { MdSpaceDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { SiGooglemessages } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { IoLogOut } from "react-icons/io5";
import { Mycontext } from '../../App';


const Sidebar=()=>{
 
    const[activeTab,setActiveTab]=useState(0);
    const[isToggleSubmenu,setIsToggleSubmenu]=useState(false);

  const isOpenSubmenu=(index)=>{
     setActiveTab(index);
     setIsToggleSubmenu(!isToggleSubmenu);
  }
    const context=useContext(Mycontext);


   return(
    <>
     <div className="sidebar">
        <ul>
            <li>
                <Link to="/">
                <Button className={`w-100 ${activeTab===0 ? 'active':''}`} onClick={()=>isOpenSubmenu(0)}>
                    <span className='icon'><MdSpaceDashboard/></span>
                    Dashboard
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
            <li>
           
                <Button className={`w-100 ${activeTab===1 ?'active':''}`} onClick={()=>isOpenSubmenu(1)}>
                    <span className='icon'><FaBoxOpen/></span>
                    Products
                    <span className='arrow'><FaAngleRight/></span>
                </Button>

                <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true  ? 'collapsed' : 'collapse'}`}>
                <ul className='submenu'>
                    <li><Link to="/products">Product List</Link></li>
                    <li><Link to="/product/details">Product View</Link></li>
                    <li><Link to="/product/upload">Product Upload</Link></li>
                </ul>
                </div>
               
            </li>
            <li>
            <Link to="/">
            <Button className={`w-100 ${activeTab===2 ? 'active':''}`} onClick={()=>isOpenSubmenu(2)}>
                    <span className='icon'><FaCartShopping/></span>
                    Orders
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
            <li>
            <Link to="/">
            <Button className={`w-100 ${activeTab===3 ? 'active':''}`} onClick={()=>isOpenSubmenu(3)}>
                    <span className='icon'><SiGooglemessages/></span>
                    Messages
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
            <li>
            <Link to="/">
            <Button className={`w-100 ${activeTab===4 ? 'active':''}`} onClick={()=>isOpenSubmenu(4)}>
                    <span className='icon'><IoMdNotifications/></span>
                    Notifications
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
            <li>
            <Link to="/">
            <Button className={`w-100 ${activeTab===5 ? 'active':''}`} onClick={()=>isOpenSubmenu(5)}>
                    <span className='icon'><IoSettings/></span>
                    Settings
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
                </Link>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><FaCartShopping/></span>
                    Orders
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><SiGooglemessages/></span>
                    Messages
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><IoMdNotifications/></span>
                    Notifications
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><IoSettings/></span>
                    Settings
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><FaCartShopping/></span>
                    Orders
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><SiGooglemessages/></span>
                    Messages
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><IoMdNotifications/></span>
                    Notifications
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
            <li>
                <Button className='w-100'>
                    <span className='icon'><IoSettings/></span>
                    Settings
                    <span className='arrow'><FaAngleRight/></span>
                </Button>
            </li>
        </ul>
        <br/>
         <div className='logoutWrapper'>
         <div className='logoutBox'>
             <Button variant="contained"><IoLogOut/>Logout</Button>

          </div>
         </div>

     </div>
    </>
   )
}
export default Sidebar;