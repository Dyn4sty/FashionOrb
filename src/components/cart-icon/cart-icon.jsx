import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
// import './cart-icon.styles.scss'
import { CartIconContainer, ItemCountContainer, StyledShoppingIcon } from './cart-icon.styles'

const CartIcon = ({dispatch, itemCount}) => (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
        <StyledShoppingIcon/>
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
)

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})
export default connect(mapStateToProps)(CartIcon)