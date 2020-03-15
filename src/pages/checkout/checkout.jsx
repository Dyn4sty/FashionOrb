import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, SelectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem  from '../../components/checkout-item/checkout-item'
import './checkout.styles.scss';

const CheckoutPage = ({cartItems, cartTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
                <CheckoutItem cartItem={cartItem} />)
        }
        <div className='total'>
            <span> Your Total: ${cartTotal} </span>
        </div>
    </div>
)
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: SelectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage)