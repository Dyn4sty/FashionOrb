import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item'
import { Link } from 'react-router-dom'

import { selectCollection } from '../../redux/shop/shop.selectors'
import { CollectionPageContainer, ItemsContainer } from './collection.styles'
import BannerItem from '../../components/banner-item/banner-item.component'
import TabDiv from '../../components/tab-div/tab-div.components'

const CollectionPage = ({collection, match: {params: {collectionId}}}, match) => {
    return (
        <>
        <BannerItem bannertype='center' background='https://i.ibb.co/nP6R16G/S1.jpg'  bannerheight="500px">
                <h1>{ collectionId ? collectionId.toUpperCase() : 'Featured Shop'}</h1>
                <p>{
                    collectionId ? (
                        <>
                            <Link to="/shop">Shop > </Link>
                            <b>{collectionId}</b>
                        </>
                    ):(
                    'On Eligible Items in order of $100 or more')
                    }</p>
        </BannerItem>
    <CollectionPageContainer>
        <TabDiv></TabDiv>
        <ItemsContainer>
                {collection.items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
        </ItemsContainer>
    </CollectionPageContainer>
    </>
)}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)  
}) 

export default connect(mapStateToProps)(CollectionPage)