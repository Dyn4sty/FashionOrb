import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { signOutStart } from '../../redux/user/users.actions'
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown/cart-dropdown'
// import './header.styles.scss';
import {  HeaderContainer, LogoContainer, LogoImage, OptionLink, OptionsContainer } from './header.styles'
const Header = ({ currentUser, hidden, dispatch }) => {
    const [scrollY, setScroll] = useState(0);

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // A Clean Up Function -> Serves As ComponentWillUnMount
        return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    },[scrollY])

    const handleScroll = (event) => {
        setScroll(window.scrollY);
    }

    const fixed = scrollY > 80;


    return (
    <HeaderContainer fixed={fixed}>
        <LogoContainer to="/">
            <LogoImage />
        </LogoContainer>
        <OptionsContainer fixed={fixed}>
            <OptionLink fixed={fixed} to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink fixed={fixed} to='/shop'>
                CONTACT
            </OptionLink>
            {
            currentUser ?
                <OptionLink fixed={fixed} onClick={ () => dispatch(signOutStart()) }>
                    SIGN OUT
                </OptionLink>
                :
                <OptionLink fixed={fixed} to='/signin'>
                    SIGN IN
                </OptionLink>
                
            }
            <CartIcon fixed={fixed} />
        </OptionsContainer>
        <CartDropdown hidden={hidden} />
        
    </HeaderContainer>
)
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
export default connect(mapStateToProps)(Header)