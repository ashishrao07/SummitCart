import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";



const Footer=()=>{
    return(
    <footer>
        <div className="container">
            <div className="topInfo row">
                <div className="col d-flex align-items-center"> 
                    <span>< LuShirt/></span>
                    <span className="ms-2">Everyday fresh products</span>
                </div>
                <div className="col d-flex align-items-center"> 
                    <span>< TbTruckDelivery /></span>
                    <span className="ms-2">Free Delivery for orders over $69</span>
                </div>
                <div className="col d-flex align-items-center"> 
                    <span>< RiDiscountPercentFill/></span>
                    <span className="ms-2">Daily Mega Discounts</span>
                </div>
                <div className="col d-flex align-items-center"> 
                    <span>< CiBadgeDollar /></span>
                    <span className="ms-2">Best Price on the market</span>
                </div>
            </div>
            <div className="row mt-5 linksWrap">
                <div className="col ">
                <h5>FRUITS & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#" >Fresh Vegetables</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Vegetables</Link></li>
                        <li><Link to="#" >Packaged ProductsParty Trays</Link></li>
                    </ul>
                </div>
                <div className="col ">
                <h5>BREAKFAST & DAIRY</h5>
                    <ul>
                        <li><Link to="#" >Milk & Flavoured Milk</Link></li>
                        <li><Link to="#" >Butter and Margarine</Link></li>
                        <li><Link to="#" >Cheese</Link></li>
                        <li><Link to="#" >Eggs Substitutes</Link></li>
                        <li><Link to="#" >Honey</Link></li>
                        <li><Link to="#" >Sour Cream and Dips</Link></li>
                        <li><Link to="#" >Yogurt</Link></li>
                    </ul>
                </div>
                <div className="col ">
                <h5>MEAT & SEAFOOD</h5>
                    <ul>
                        <li><Link to="#" >Breakfast Sausage</Link></li>
                        <li><Link to="#" >Dinner Sausage</Link></li>
                        <li><Link to="#" >Beef</Link></li>
                        <li><Link to="#" >Chicken</Link></li>
                        <li><Link to="#" >Sliced Dei Meat</Link></li>
                        <li><Link to="#" >Crabs and Shellfish</Link></li>
                        <li><Link to="#" >Farm raised Fillets</Link></li>
                    </ul>
                </div>
                <div className="col ">
                <h5>BEVERAGES</h5>
                    <ul>
                        <li><Link to="#" >Sparkling Water</Link></li>
                        <li><Link to="#" >Soda and Pop</Link></li>
                        <li><Link to="#" >Mojitos</Link></li>
                        <li><Link to="#" >Craft Beer</Link></li>
                        <li><Link to="#" >Wine</Link></li>
                        <li><Link to="#" >Drink boxes and pouches</Link></li>
                    </ul>
                </div>
                <div className="col ">
                <h5>BREADS & BAKERY</h5>
                    <ul>
                        <li><Link to="#" >Fresh Vegetables</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Vegetables</Link></li>
                        <li><Link to="#" >Packaged ProductsParty Trays</Link></li>
                    </ul>
                </div>
                <div className="col ">
                    <h5>FRUITS & VEGETABLES</h5>
                    <ul>
                        <li><Link to="#" >Fresh Vegetables</Link></li>
                        <li><Link to="#" >Herbs & Seasonings</Link></li>
                        <li><Link to="#" >Fresh Fruits</Link></li>
                        <li><Link to="#" >Cuts & sprouts</Link></li>
                        <li><Link to="#" >Exotic Fruits & Vegetables</Link></li>
                        <li><Link to="#" >Packaged ProductsParty Trays</Link></li>
                    </ul>
                </div>
            </div>
  
            <div className="copyright mt-3 pt-3 pb-3 d-flex ">
                <p className="mb-0">Copyright 2024. All rights reserved</p>
                <ul className="list list-inline ms-auto mb-0 socials">
                    <li className="list-inline-item ">
                        <Link to="#" className="ms-2 fb"><FaFacebookF/></Link>
                        <Link to="#" className="ms-2"><FaSquareXTwitter/></Link>
                        <Link to="#"className="ms-2">< IoLogoInstagram/></Link>
                    </li>
                </ul>
                </div>
        </div>
    </footer>

    )
}
export default Footer;