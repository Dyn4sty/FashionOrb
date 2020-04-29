import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  SelectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";
import {
  CheckoutHeaderContainer,
  CheckoutPageContainer,
  HeaderBlockContainer,
  ContentTextWarning,
  ContentTotal,
} from "./checkout.styles";

export const CheckoutPage = ({ cartItems, cartTotal }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map((cartItem) => (
      <CheckoutItem cartItem={cartItem} />
    ))}
    <ContentTotal>
      <span> Your Total: ${cartTotal} </span>
    </ContentTotal>
    <ContentTextWarning>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
    </ContentTextWarning>
    <StripeCheckoutButton price={cartTotal} />
  </CheckoutPageContainer>
);
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: SelectCartTotal,
});
export default connect(mapStateToProps)(CheckoutPage);
