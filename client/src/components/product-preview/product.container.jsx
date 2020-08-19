import { connect } from "react-redux";
import { compose } from "redux";
import WithSpinner from "../with-spinner/with-spinner";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import Product from "./Product";
import { createStructuredSelector } from "reselect";

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
});

const ProductContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Product); // Same connect(mapStateToProps)( WithSpinner(Product) )

export default ProductContainer;
