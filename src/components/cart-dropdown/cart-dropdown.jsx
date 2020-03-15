import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors'

import './cart-dropdown.styles.scss';

const CartDropdown = ({hidden, cartItems, history, dispatch}) => (
  <div className={`${hidden ? 'cart-dropdown' : 'cart-dropdown-is-shown' }`}>
    <div className='cart-items'>
      {cartItems.length ? 
      cartItems.map(item => <CartItem key={item.id} item={item}/> ) : (
      <span className='empty-message'>Your Cart is empty</span>
      )
      }
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout')
     dispatch(toggleCartHidden())
     }}>
    GO TO CHECKOUT
    </CustomButton>
  </div>
);


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));