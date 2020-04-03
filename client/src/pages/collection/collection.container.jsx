import { connect } from 'react-redux';
import { compose } from 'redux'
import WithSpinner from '../../components/with-spinner/with-spinner'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import CollectionPage from './collection'
import { createStructuredSelector } from 'reselect';


const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
})

const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner,
)(CollectionPage)  // Same as connect(mapStateToProps)( WithSpinner(CollectionPage) )

export default CollectionsOverviewContainer