import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
// import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils' 
// import { ReactComponent as Logo } from '../../assets/Orb.svg';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown/cart-dropdown'
// import './header.styles.scss';
import {  HeaderContainer, LogoContainer, LogoImage, OptionLink, OptionsContainer } from './header.styles'
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            scrollY: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        this.setState({scrollY: window.scrollY})
    }
    render()
        {
        const { currentUser, hidden } = this.props
        const { scrollY } = this.state
        const fixed = scrollY > 80 
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
                    <OptionLink fixed={fixed} onClick={ () => auth.signOut() }>
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
    )}
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})
export default connect(mapStateToProps)(Header)