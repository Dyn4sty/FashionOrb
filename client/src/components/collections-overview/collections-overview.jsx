import React from 'react';
import { connect }from 'react-redux';
import {withRouter} from 'react-router-dom'

import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview'
import { CollectionsOverViewContainer } from './collections-overview.styles'
import BannerItem from '../banner-item/banner-item';
import TabDiv from '../tab-div/tab-div.components';


const CollectionsOverview = ({collections}) =>  {
    return (
    <>
        <BannerItem bannertype={'center'} background={'https://i.ibb.co/G0XJb1R/S2.jpg'} bannerheight="500px">
                <h1>Featured Shop</h1>
                <p>On Eligible Items in order of $100 or more</p>
        </BannerItem>
        <CollectionsOverViewContainer>
        <TabDiv></TabDiv>
        {collections.map(({id, routeName, ...OtherCollectionProps}) => (
                <CollectionPreview key={id} id={routeName} {...OtherCollectionProps}/>
            ))
        }
        </CollectionsOverViewContainer>
    </>
)}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default withRouter(connect(mapStateToProps)(CollectionsOverview))