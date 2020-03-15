import React from 'react';
import {connect} from 'react-redux'
import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item'
import './cart-dropdown.styles.scss';

const CartDropdown = ({hidden, cartItems}) => (
  <div className={`${hidden ? 'cart-dropdown' : 'cart-dropdown-is-shown' }`}>
    <div className='cart-items'>
      {cartItems.map(item => <CartItem key={item.id} item={item}/>
      )
      }
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);
const mapStateToProps = ({cart: {cartItems}}) => ({
  cartItems
})

export default connect(mapStateToProps)(CartDropdown);