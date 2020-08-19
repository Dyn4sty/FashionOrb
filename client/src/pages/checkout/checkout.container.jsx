import { connect } from 'react-redux';
import { compose } from 'redux'
import WithSpinner from '../../components/with-spinner/with-spinner'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import CheckoutPage from './checkout'
import { createStructuredSelector } from 'reselect';


const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectCurrentUser(state)
})

const CheckoutContainer = compose (
    connect(mapStateToProps),
    WithSpinner,
)(CheckoutPage)  // Same as connect(mapStateToProps)( WithSpinner(CollectionPage) )

export default CheckoutContainer