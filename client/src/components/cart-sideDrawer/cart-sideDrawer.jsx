import React, { useEffect } from "react";
import "./cartSideDrawer.styles.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartItem from "../cart-item/cart-item";
const CartSideDrawer = ({ hidden, cartItems, cartTotal, closeCart }) => {
  //   const isHidden = useSelector(selectCartHidden);
  const { t } = useTranslation();
  useEffect(() => {
    if (!hidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hidden]);

  return (
    <>
      <div
        id="sidebar-cart"
        className="Drawer Drawer--fromRight"
        aria-hidden={hidden ? true : false}
        data-section-id="cart"
        data-section-type="cart"
        tabIndex="-1"
      >
        <div className="Drawer__Header Drawer__Header--bordered Drawer__Container">
          <span className="Drawer__Title Heading u-h4">
            {t("sidedrawer.cart")}
          </span>

          <button
            className="Drawer__Close Icon-Wrapper--clickable"
            data-action="close-drawer"
            data-drawer-id="sidebar-cart"
            aria-label="Close SideDrawer"
            onClick={() => closeCart(true)}
          >
            <svg
              className="Icon Icon--close"
              role="presentation"
              viewBox="0 0 16 14"
            >
              <path
                d="M15 0L1 14m14 0L1 0"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="Cart Drawer__Content">
          <div className="Drawer__Main" data-scrollable>
            {cartTotal > 0 ? (
              <div className="Drawer__Container">
                <input
                  type="hidden"
                  name="attributes[collection_mobile_items_per_row]"
                  value=""
                />
                <input
                  type="hidden"
                  name="attributes[collection_desktop_items_per_row]"
                  value=""
                />

                <div className="Cart__ItemList">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.name}
                      item={item}
                      closeCart={closeCart}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p className="Cart__Empty Heading u-h5">
                {t("sidedrawer.cart_empty") || "Your Shopping bag is empty"}
              </p>
            )}
          </div>
          {cartTotal > 0 && (
            <div className="Drawer__Footer" data-drawer-animated-bottom>
              <Link to="/cart" onClick={() => closeCart(true)}>
                <button
                  type="submit"
                  name="checkout"
                  className="Cart__Checkout Button Button--primary Button--full giftbox-checkout"
                >
                  <span>Pay</span>
                  <span className="Button__SeparatorDot"></span>
                  <span className="wholesale-cart-total"> ${cartTotal}</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(CartSideDrawer);
