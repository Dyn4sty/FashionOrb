import React from 'react';
import { connect }from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview'
import { CollectionsOverViewContainer } from './collections-overview.styles'

// import './collections-overview.styles.scss'

const CollectionsOverview = ({collections}) => (
    <CollectionsOverViewContainer>
    {collections.map(({id, ...OtherCollectionProps}) => (
            <CollectionPreview key={id} {...OtherCollectionProps}/>
        ))
    }
    </CollectionsOverViewContainer>
)
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionsOverview)