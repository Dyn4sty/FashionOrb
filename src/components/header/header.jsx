import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils' 
import { ReactComponent as Logo } from '../../assets/Orb.svg';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown/cart-dropdown'
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className ='logo'></Logo>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
            currentUser ?
                <div className='option' onClick={ () => auth.signOut() }>
                    SIGN OUT
                </div>
                :
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
                
            }
            <CartIcon />
        </div>
        <CartDropdown hidden={hidden} />
           
    </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
export default connect(mapStateToProps)(Header)