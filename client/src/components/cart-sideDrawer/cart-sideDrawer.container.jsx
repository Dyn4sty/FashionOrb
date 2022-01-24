import React, { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartSideDrawer from "./cart-sideDrawer";
import useOutsideAlerter from "../../hooks/useOutSideAlerter";

import {
  selectCartItems,
  SelectCartTotal,
} from "../../redux/cart/cart.selectors";

import { openAndCloseCart } from "../../redux/cart/cart.actions";

function BackDropCart({ hidden }) {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(SelectCartTotal);
  const dispatch = useDispatch();
  const cb = useCallback(() => dispatch(openAndCloseCart(true)), [dispatch]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, cb, !hidden);
  return (
    <div ref={wrapperRef}>
      <CartSideDrawer
        hidden={hidden}
        closeCart={() => dispatch(openAndCloseCart(true))}
        cartItems={cartItems}
        cartTotal={cartTotal}
      />
    </div>
  );
}

export default React.memo(BackDropCart);
