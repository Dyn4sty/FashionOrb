import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart, RemoveItem, addItem} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem, clearItemFromCart, RemoveItem, addItem}) => {
    const {imageUrl, price, name, quantity} = cartItem
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => RemoveItem(cartItem)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>

        </span>
        <span className='price'>${price}</span>
        <span onClick={() => clearItemFromCart(cartItem)} className='remove-button'>&#10005;</span>
    </div>
)}
const mapDispatchToProps = dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    RemoveItem: item => dispatch(RemoveItem(item)),
    addItem: item => dispatch(addItem(item))
})
export default connect(null,mapDispatchToProps)(CheckoutItem)