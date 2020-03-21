import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
// import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer, CartDropdownButton } from './cart-dropdown.styles'
// import './cart-dropdown.styles.scss';

const CartDropdown = ({hidden, cartItems, history, dispatch}) => (
  <CartDropdownContainer hidden={hidden}>
    <CartItemsContainer hidden={hidden}>
      {cartItems.length ? 
      cartItems.map(item => <CartItem key={item.id} item={item}/> ) : (
      <EmptyMessageContainer>Your Cart is empty</EmptyMessageContainer>
      )
      }
    </CartItemsContainer>
    <CartDropdownButton onClick={() => {
      history.push('/checkout')
     dispatch(toggleCartHidden())
     }}>
    GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));