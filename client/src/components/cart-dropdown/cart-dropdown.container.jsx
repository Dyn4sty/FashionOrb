import React, { useCallback, useRef } from "react";
import CartDropdown from "./cart-dropdown";
import useOutsideAlerter from "../../hooks/useOutSideAlerter";
import {
  selectCartItems,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { openAndCloseCart } from "../../redux/cart/cart.actions";

function BackDropCart({ openAndCloseCart, cartItems, hidden }) {
  const cb = useCallback(() => openAndCloseCart(true), [openAndCloseCart]);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, cb, !hidden);

  return (
    <div ref={wrapperRef}>
      <CartDropdown
        hidden={hidden}
        openAndCloseCart={openAndCloseCart}
        cartItems={cartItems}
      />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  openAndCloseCart: (hidden) => dispatch(openAndCloseCart(hidden)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackDropCart);
