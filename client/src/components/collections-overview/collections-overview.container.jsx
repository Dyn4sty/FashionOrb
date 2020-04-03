import { connect } from 'react-redux';
import { compose } from 'redux'
import WithSpinner from '../with-spinner/with-spinner'
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import CollectionsOverview from './collections-overview'
import { createStructuredSelector } from 'reselect';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner,
)(CollectionsOverview)  // Same connect(mapStateToProps)( WithSpinner(CollectionsOverview) )

export default CollectionsOverviewContainer