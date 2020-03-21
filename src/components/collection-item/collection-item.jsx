import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';
import { openAndCloseCart } from '../../redux/cart/cart.actions';
import { CollectionFooterContainer, CollectionItemContainer, ImageContainer, NameSpan, PriceSpan, AddButton  } from './collection-item.styles'
// import CustomButton from '../custom-button/custom-button'

// import './collection-item.styles.scss'

const CollectionItem = ({item, addItem, openAndCloseCart}) => {
    const {name, price, imageUrl } = item
    return (
    <CollectionItemContainer>
        <ImageContainer
        backgroundImage={imageUrl}
        />
        <CollectionFooterContainer>
            <NameSpan>{ name }</NameSpan>
            <PriceSpan>${ price } </PriceSpan>
        </CollectionFooterContainer>
        <AddButton  inverted onClick={() => {
            openAndCloseCart(false)
            setTimeout(() => openAndCloseCart(true), 4000)
            addItem(item)
        }
        }> Add to Cart</AddButton>
    </CollectionItemContainer>
)}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    openAndCloseCart: hidden => dispatch(openAndCloseCart(hidden))
})
export default connect(null, mapDispatchToProps)(CollectionItem)