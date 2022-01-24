import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  SelectCartTotal,
  selectCartItems,
} from "../../redux/cart/cart.selectors";
import { openAndCloseCart } from "../../redux/cart/cart.actions";
import CartItem from "../../components/cart-item/cart-item";
import "./cart.scss";
import { useTranslation } from "react-i18next";
import BannerItem from "../../components/banner-item/banner-item";
import CartBanner from "../../assets/CartBanner.jpg";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(SelectCartTotal);
  const dispatch = useDispatch();
  const closeCart = () => dispatch(openAndCloseCart(true));
  const { t } = useTranslation();

  if (cartItems.length < 1) {
    return (
      <div className="EmptyState">
        <div className="container">
          <h1 className="EmptyState__Title Heading u-h5">סל הקניות שלך ריק</h1>
          <Link
            to="/shop"
            className="EmptyState__Action Button Button--primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <BannerItem
        background={CartBanner}
        bannerheight="500px"
        bannertype="center"
      >
        <h1 style={{ textTransform: "capitalize" }}>{t("sidedrawer.cart")}</h1>
      </BannerItem>
      <div className="container">
        <div className="PageContent">
          <div className="Cart Cart--expanded">
            <div className="Cart__ItemList">
              <div className="Cart__Head hidden-phone">
                <span className="Cart__HeadItem Heading Text--subdued u-h7">
                  Product
                </span>
                <span className="Cart__HeadItem"></span>
                <span
                  className="Cart__HeadItem Heading Text--subdued u-h7"
                  style={{ textAlign: "center" }}
                >
                  Quantity
                </span>
                <span
                  className="Cart__HeadItem Heading Text--subdued u-h7"
                  style={{ textAlign: "right" }}
                >
                  Total
                </span>
              </div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.name}
                  item={item}
                  closeCart={closeCart}
                  cartPage={true}
                />
              ))}
            </div>
            <footer className="Cart__Footer ">
              <div className="Cart__Recap">
                <p className="Cart__Total Heading u-h6">
                  Total:
                  <span>
                    <span className="wholesale-original-cart-total">
                      <span className="wholesale-original-price">
                        <span style={{ padding: "0.2em" }}>${cartTotal}</span>
                      </span>
                    </span>
                  </span>
                </p>
                <Link to={"/checkout"}>
                  <button className="Cart__Checkout Button Button--primary Button--full">
                    Checkout
                  </button>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
