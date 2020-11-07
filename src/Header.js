import React from 'react'
import './Header.css';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';

function Header() {
    const [{basket,user},dispatch] = useStateValue();

    const handleAuthentication = ()=>{
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            {/* making an amazonlogo as a link and redirecting it to the default home page */}
           <Link to="/"> <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""/> </Link>
            <div className="header_search">
                <input className="header_searchInput" type="text"/>
                <SearchIcon className="header_searchIcon"/>
            </div>
            <div className="header_nav">
                <div className="header_option">
                <span className="header_optionLineOne">Hello {!user ?'Guest':user?.email}</span>
                <Link to={!user && "/login"}>
                    <span onClick={handleAuthentication} className="header_optionLinetwo">{user?'Sign out':'Sign in'}</span>
                </Link>
                </div>
                <Link to="/orders">
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLinetwo">& Orders</span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLinetwo">Prime</span>
                </div>
                <div className="header_optionBasket">
                    <Link to="/checkout"><ShoppingBasketIcon/></Link>
                    <span className="header_optionLinetwo header_basketCount">{basket?.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Header

