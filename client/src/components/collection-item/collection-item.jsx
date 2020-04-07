import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addItem, openAndCloseCart } from '../../redux/cart/cart.actions';

import { CollectionFooterContainer, CollectionItemContainer, ImageContainer, NameSpan, PriceSpan, AddButton  } from './collection-item.styles'

const CollectionItem = ({item, addItem, openAndCloseCart, collectionId, match}) => {
    const {name, price, imageUrl } = item
    return (
    <CollectionItemContainer>
        <ImageContainer as={Link} to={{
            pathname: `/shop/${collectionId}/${name}`,
            state: {item}
            }
        }
        backgroundImage={imageUrl}
        />
        <CollectionFooterContainer>
            <NameSpan>{ name }</NameSpan>
            <PriceSpan>${ price } </PriceSpan>
        </CollectionFooterContainer>
        <AddButton  inverted onClick={() => {
            openAndCloseCart(false)
            setTimeout(() => openAndCloseCart(true), 4000)
            addItem({...item, collectionId})
        }
        }> Add to Cart</AddButton>
    </CollectionItemContainer>
    
)}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    openAndCloseCart: hidden => dispatch(openAndCloseCart(hidden))
})
export default withRouter(connect(null, mapDispatchToProps)(CollectionItem))