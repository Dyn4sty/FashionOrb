import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item'
import { createStructuredSelector } from 'reselect'
import { selectCollection } from '../../redux/shop/shop.selectors'
import { CollectionPageContainer, ItemsContainer, TitleContainer } from './collection.styles'
// import './collection.styles.scss'

const CollectionPage = ({collection}) => {
    const {title, items} = collection
    return (
    <CollectionPageContainer>
        <TitleContainer>
            {title}
        </TitleContainer>
        <ItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
        </ItemsContainer>
    </CollectionPageContainer>
)}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    collection: selectCollection(ownProps.match.params.collectionId)
})

export default connect(mapStateToProps)(CollectionPage)