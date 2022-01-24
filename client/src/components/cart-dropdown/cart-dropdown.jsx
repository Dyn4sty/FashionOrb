import React from "react";
import { withRouter } from "react-router-dom";
import CartItem from "../cart-item/cart-item";
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton,
} from "./cart-dropdown.styles";
// import './cart-dropdown.styles.scss';

const CartDropdown = ({
  hidden,
  cartItems,
  history,
  openAndCloseCart
}) => (
  <CartDropdownContainer hidden={hidden}>
    <CartItemsContainer hidden={hidden}>
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <EmptyMessageContainer>Your Cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push("/checkout");
        openAndCloseCart(true);
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

export default withRouter(CartDropdown);
