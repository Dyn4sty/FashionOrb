import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { signOutStart } from '../../redux/user/users.actions'
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown/cart-dropdown'

import {  HeaderContainer, LogoContainer, LogoImage, OptionLink, OptionsContainer } from './header.styles'

const Header = ({ currentUser, hidden, dispatch }) => {

    const [fixed, setFixed] = useState(false);

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // A Clean Up Function -> Serves As ComponentWillUnMount
        return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    },)

    const handleScroll = (event) => {
        // fixed navbar
        if (window.scrollY > 80 && !fixed){ 
            setFixed(true)
        }
        // reset navbar
        if (window.scrollY < 80 && fixed){
            setFixed(false)
        }
    }
    
    return (
    <HeaderContainer fixed={fixed}>
        <LogoContainer to="/">
            <LogoImage />
        </LogoContainer>
        <OptionsContainer fixed={fixed}>
            <OptionLink fixed={fixed} to='/shop'>
                Shop
            </OptionLink>
            <OptionLink fixed={fixed} to='/shop'>
                Contact
            </OptionLink>
            {
            currentUser ?
                <OptionLink fixed={fixed} onClick={ () => dispatch(signOutStart()) }>
                    Sign Out
                </OptionLink>
                :
                <OptionLink fixed={fixed} to='/signin'>
                    Sign In
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
export default connect(mapStateToProps)(React.memo(Header))