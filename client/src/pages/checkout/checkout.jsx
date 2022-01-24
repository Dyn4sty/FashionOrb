import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  SelectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import "./checkout.styles.scss";
import { COUNTRIES } from "./Countries";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import CustomButton from "../../components/custom-button/custom-button";
import FormInput from "../../components/form-input/forum-input";
// import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
// import CountrySelect from "react-bootstrap-country-select";



export const CheckoutPage = ({
  cartItems,
  cartTotal,
  match,
  history,
  user,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [billingDetails, setBillingDetails] = useState({
    billing_first_name: "",
    billing_last_name: "",
    billing_company: "",
    billing_country: "",
    billing_address_1: "",
    billing_address_2: "",
    billing_city: "",
    billing_postcode: "",
    billing_phone: "",
    billing_email: "",
    paymentMethod: "visa",
  });
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const {
    billing_address_1,
    billing_address_2,
    billing_company,
    billing_city,
    billing_country,
    billing_email,
    billing_first_name,
    billing_last_name,
    billing_phone,
    billing_postcode,
    paymentMethod,
  } = billingDetails;
  useEffect(() => {
    if (cartTotal < 1) {
      return history.push("/shop");
    }
  }, [cartTotal, history]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (user && cartItems) {
      async function createPaymentIntent() {
        try {
          const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartItems, user }),
          });
          const data = await res.json();
          setClientSecret(data.clientSecret);
        } catch (err) {
          console.log(err);
        }
      }

      createPaymentIntent();
    }
  }, [cartItems, user]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === "billing_phone") {
      const regex = /^[0-9\b]+$/;
      if (value !== "" && !regex.test(value)) {
        return;
      }
    }
    setBillingDetails({ ...billingDetails, [name]: value });
  };
  const handleCountryChange = (billing_country) => {
    setBillingDetails({ ...billingDetails, billing_country });
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };
  const handleCardChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    if (
      !event.empty &&
      billing_email &&
      billing_city &&
      billing_country &&
      billing_address_1 &&
      billing_phone
    ) {
      setDisabled(false);
    }
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const cardElement = elements.getElement(CardElement);
    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          address: {
            city: billing_city,
            country: billing_country,
            line1: billing_address_1,
          },
          email: billing_email,
          name: `${billing_first_name} ${billing_last_name}`,
          phone: billing_phone,
        },
      });
      const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: billing_email,
        payment_method: paymentMethodReq.paymentMethod.id,
        setup_future_usage: "off_session",
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    } catch (err) {
      setError(`Payment failed ${err}`);
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="site-content">
        <div className="inner-intro">
          <div className="container">
            <div className="intro-title align-items-center row">
              <div className="text-left col-md-6">
                <div className="intro-title-inner">
                  <h1>Checkout</h1>
                </div>
              </div>
              <div className="text-right col-md-6">
                <Breadcrumb routes={match.url.split("/")} />
                {/* <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                    <span>
                      <a className="bread-link bread-home" href="/">
                        Home
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>Checkout</span>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrapper mb-7">
          <div className="container">
            {/* form Start */}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-sm-12">
                      <div className="billing-fields mt-5">
                        <h3>Billing details</h3>
                        <div className="billing-fields__field-wrapper">
                          <FormInput
                            name="billing_first_name"
                            label="First Name"
                            type="text"
                            autoComplete="given-name"
                            handleChange={handleChange}
                            value={billing_first_name}
                            abbr
                            required
                          />
                          <span className="error"></span>
                          <FormInput
                            name="billing_last_name"
                            label="Last name"
                            type="text"
                            autoComplete="family-name"
                            handleChange={handleChange}
                            value={billing_last_name}
                            abbr
                            required
                          />
                          <span className="error"></span>

                          <FormInput
                            name="billing_company"
                            label="Company Name"
                            type="text"
                            handleChange={handleChange}
                            value={billing_company}
                          />
                          {/* <div className="">
                            <label htmlFor="billing_country" className="">
                              Country&nbsp;
                              <abbr
                                className="required"
                                title="required"
                              ></abbr>
                            </label> */}
                          {/* Countires Component */}
                          {/* <CountrySelect
                            as={FormInput}
                            name="billing_country"
                            id="billing_country"
                            // className="form-control"
                            value={billing_country}
                            flush={true}
                            // countries={COUNTRIES}
                            onChange={handleCountryChange}
                          /> */}
                          {/* <select
                              autoComplete="country"
                              name="billing_country"
                              id="billing_country"
                              className="form-control"
                              onChange={handleChange}
                            >
                              {COUNTRIES.map(({ text, value }) => (
                                <option key={text} value={value}>
                                  {text}
                                </option>
                              ))}
                            </select> */}
                          {/* </div> */}
                          <FormInput
                            className="form-control"
                            name="billing_address_1"
                            label="House number and street name"
                            type="text"
                            handleChange={handleChange}
                            value={billing_address_1}
                          />

                          <div className="form-group">
                            <FormInput
                              name="billing_address_2"
                              label="Apartment, suite, unit etc. (optional)"
                              type="text"
                              value={billing_address_2}
                              onChange={handleChange}
                            />
                          </div>
                          <FormInput
                            name="billing_city"
                            label="Town / City"
                            type="text"
                            value={billing_city}
                            abbr
                            required
                            handleChange={handleChange}
                          />

                          <FormInput
                            name="billing_postcode"
                            label="Postcode / ZIP"
                            autoComplete="postal-code"
                            type="tel"
                            value={billing_postcode}
                            required
                            abbr
                            handleChange={handleChange}
                          />
                          <FormInput
                            name="billing_phone"
                            label="Phone"
                            autoComplete="tel"
                            type="tel"
                            value={billing_phone}
                            handleChange={handleChange}
                            required
                            abbr
                          />
                          <FormInput
                            name="billing_email"
                            label="Email address"
                            autoComplete="email username"
                            type="email"
                            value={billing_email}
                            handleChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Order Revivew */}
                <div className="mt-5 col-lg-6">
                  <h3 id="order_review_heading">Your order</h3>
                  <div id="order_review" className="checkout-review-order">
                    <table className="shop_table checkout-review-order-table">
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map(({ price, quantity, name }, idx) => (
                          <tr key={idx} className="cart_item">
                            <td className="product-name">
                              {name}&nbsp;{" "}
                              <strong className="prod uct-quantity">
                                × {quantity}
                              </strong>{" "}
                            </td>
                            <td className="product-total">
                              <span className="woocs_special_price_code">
                                <span className="Price-amount amount">
                                  <span className="Price-currencySymbol">
                                    $
                                  </span>
                                  {price * quantity}
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td>
                            <span className="woocs_special_price_code">
                              <span className="Price-amount amount">
                                <span className="Price-currencySymbol">$</span>
                                {cartTotal}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr className="shipping-totals shipping">
                          <th>Shipping</th>
                          <td data-title="Shipping">
                            <ul
                              id="shipping_method"
                              className="shipping-methods"
                            >
                              <li>
                                <input
                                  id="shipping_method_0_flat_rate3"
                                  type="radio"
                                  name="shipping_method[0]"
                                  data-index="0"
                                  className="shipping_method"
                                  value="flat_rate:3"
                                  style={{ cursor: "pointer" }}
                                />
                                <label
                                  htmlFor="shipping_method_0_flat_rate3"
                                  style={{ cursor: "pointer" }}
                                >
                                  Flat rate:{" "}
                                  <span className="Price-amount amount">
                                    <span className="Price-currencySymbol">
                                      $
                                    </span>
                                    1.50{" "}
                                  </span>
                                </label>
                              </li>

                              <li>
                                <input
                                  type="radio"
                                  id="shipping_method_0_local_pickup4"
                                  name="shipping_method[0]"
                                  data-index="0"
                                  className="shipping_method"
                                  value="local_pickup:4"
                                  style={{ cursor: "pointer" }}
                                />
                                <label
                                  htmlFor="shipping_method_0_local_pickup4"
                                  style={{ cursor: "pointer" }}
                                >
                                  Local pickup:{" "}
                                  <span className="Price-amount amount">
                                    <span className="Price-currencySymbol">
                                      $
                                    </span>
                                    2.00
                                  </span>
                                </label>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <span className="woocs_special_price_code">
                              <span
                                className="Price-amount amount"
                                style={{ fontWeight: 500 }}
                              >
                                <span className="Price-currencySymbol">$</span>
                                {cartTotal}
                              </span>
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div id="payment" className="checkout-payment">
                      <ul className="payment_methods methods">
                        <li className="payment_method_paypal">
                          <input
                            id="payment_method_visa"
                            type="radio"
                            className="input-radio"
                            name="paymentMethod"
                            data-order_button_text="pay with Stripe"
                            value="visa"
                            onChange={handleChange}
                            checked={paymentMethod === "visa"}
                          />
                          <label htmlFor="card-element">
                            Credit or debit card
                          </label>
                          {paymentMethod === "visa" && (
                            <CardElement
                              id="card-element"
                              options={cardStyle}
                              onChange={handleCardChange}
                            />
                          )}
                        </li>
                        <li className="payment_method_paypal">
                          <input
                            id="payment_method_paypal"
                            type="radio"
                            className="input-radio"
                            name="paymentMethod"
                            data-order_button_text="pay with Stripe"
                            value="paypal"
                            onChange={handleChange}
                            checked={paymentMethod === "paypal"}
                          />
                          <label htmlFor="card-element">Paypal </label>
                          {paymentMethod === "paypal" && <span>Paypal</span>}
                        </li>
                      </ul>
                      <div className="form-row place-order">
                        <div className="terms-and-conditions-wrapper">
                          <div className="privacy-policy-text">
                            <p>
                              Your personal data will be used to process your
                              order, support your experience throughout this
                              website, and for other purposes described in our
                            </p>
                          </div>
                          <p className="form-row validate-required ml-5">
                            <label className="form__label htmlForm__label-for-checkbox checkbox">
                              <input
                                className="form-check-input"
                                name="terms"
                                id="terms"
                                type="checkbox"
                              />
                              <span className="terms-and-conditions-checkbox-text">
                                I have read and agree to the website
                              </span>
                              &nbsp;<span className="required">*</span>
                            </label>
                            <input
                              name="terms-field"
                              type="hidden"
                              className="form-control"
                              value="1"
                            />
                          </p>
                        </div>
                        {/* StripeButton */}
                        <CustomButton
                          disabled={processing || disabled || succeeded}
                          type="submit"
                          className="button alt"
                          name="checkout_place_order"
                          id="place_order"
                          value="Place order"
                          data-value="Place order"
                        >
                          <span id="button-text">
                            {processing ? (
                              <div className="spinner-grow" id="spinner" />
                            ) : (
                              "Place Order"
                            )}
                          </span>
                        </CustomButton>
                        {/* Show any error that happens when processing the payment */}
                        {error && (
                          <div className="card-error" role="alert">
                            {error}
                          </div>
                        )}
                        {/* Show a success message upon completion */}
                        <p
                          className={
                            succeeded
                              ? "result-message"
                              : "result-message hidden"
                          }
                        >
                          Payment succeeded, see the result in your
                          <a
                            href={`https://dashboard.stripe.com/test/payments`}
                          >
                            {" "}
                            Stripe dashboard.
                          </a>{" "}
                          Refresh the page to pay again.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: SelectCartTotal,
  user: selectCurrentUser,
});
export default connect(mapStateToProps)(CheckoutPage);
