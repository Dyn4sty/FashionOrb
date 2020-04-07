import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearItemFromCart, RemoveItem, addItem} from '../../redux/cart/cart.actions';
import { CheckoutItemContainer, ImageContainer, ContentContainer, RemoveButton, ValueContainer } from './checkout-item.styles'
// import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem: item, clearItemFromCart, RemoveItem, addItem}) => {
    const {imageUrl, price, name, quantity, collectionId} = item
    console.log(item)
    return (
    <CheckoutItemContainer>
        <ImageContainer as={Link} to={{
            pathname: `/shop/${collectionId}/${name}`,
            state: {item}
            }
        }>
            <img src={imageUrl} alt='item'/>
        </ImageContainer>
        <ContentContainer>{name}</ContentContainer>
        <ContentContainer>
            <div onClick={() => RemoveItem(item)}>&#10094;</div>
            <ValueContainer c>{quantity}</ValueContainer>
            <div onClick={() => addItem(item)}>&#10095;</div>

        </ContentContainer>
        <ContentContainer>${price}</ContentContainer>
        <RemoveButton onClick={() => clearItemFromCart(item)}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
)}
const mapDispatchToProps = dispatch => ({
    clearItemFromCart: item => dispatch(clearItemFromCart(item)),
    RemoveItem: item => dispatch(RemoveItem(item)),
    addItem: item => dispatch(addItem(item))
})
export default connect(null,mapDispatchToProps)(React.memo(CheckoutItem))