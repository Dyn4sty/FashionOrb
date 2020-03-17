import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';
import { openAndCloseCart } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button'

import './collection-item.styles.scss'

const CollectionItem = ({item, addItem, openAndCloseCart}) => {
    const {name,price,imageUrl } = item
    return (
    <div className='collection-item'>
        <div className='image'
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
        <div className='collection-footer'>
            <span className='name'>{ name }</span>
            <span className='price'>${ price } </span>
        </div>
        <CustomButton inverted onClick={() => {
            openAndCloseCart(false)
            addItem(item)
        }
        }> Add to Cart</CustomButton>
    </div>
)}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    openAndCloseCart: hidden => dispatch(openAndCloseCart(hidden))
})
export default connect(null, mapDispatchToProps)(CollectionItem)