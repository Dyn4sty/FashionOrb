import React from "react";
import {
  RemoveItem,
  addItem,
  clearItemFromCart,
  updateItemQuantity,
} from "../../redux/cart/cart.actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import ''
const CartItem = ({ item, closeCart, cartPage }) => {
  const dispatch = useDispatch();
  return (
    <div className="CartItem">
      <div className="CartItem__ImageWrapper ">
        <Link
          to={`/shop/${item.collectionId}/${item.name}`}
          onClick={closeCart}
        ></Link>
        <div className="AspectRatio" style={{ aspectRatio: "1.0" }}>
          <img
            className="CartItem__Image"
            src={item.imageUrl}
            loading="lazy"
            alt={item.name}
          />
        </div>
      </div>

      <div className="CartItem__Info">
        <h2 className="CartItem__Title Heading">
          <Link
            to={`/shop/${item.collectionId}/${item.name}`}
            onClick={closeCart}
          >
            {item.name}
          </Link>
        </h2>

        <div className="CartItem__Meta Heading Text--subdued">
          <ul className="CartItem__PropertyList"></ul>
          <div className="CartItem__PriceList">
            <span className="CartItem__Price Price">$ {item.price}</span>
          </div>
        </div>
        <div
          className="CartItem__Actions Heading Text--subdued"
          style={{ textAlign: "center" }}
        >
          <div className="CartItem__QuantitySelector">
            <div className="QuantitySelector">
              <button
                className="QuantitySelector__Button Link Link--primary"
                title="קבע כמות ל0"
                onClick={() => dispatch(RemoveItem(item))}
              >
                <svg
                  className="Icon Icon--minus"
                  role="presentation"
                  viewBox="0 0 16 2"
                >
                  <path
                    d="M1,1 L15,1"
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </button>

              <input
                type="text"
                pattern="[0-9]"
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  if (isNaN(quantity)) {
                    return;
                  }
                  dispatch(updateItemQuantity(item, quantity));
                }}
                className="QuantitySelector__CurrentQuantity"
                value={item.quantity}
              />
              <button
                className="QuantitySelector__Button Link Link--primary"
                title={`Set quantity to ${item.quantity + 1}`}
                onClick={() => dispatch(addItem(item))}
              >
                <svg
                  className="Icon Icon--plus"
                  role="presentation"
                  viewBox="0 0 16 16"
                >
                  <g
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="square"
                  >
                    <path d="M8,1 L8,15"></path>
                    <path d="M1,8 L15,8"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <span
            className="CartItem__Remove Link Link--underline Link--underlineShort"
            data-quantity="0"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(clearItemFromCart(item))}
          >
            Remove
          </span>
        </div>
      </div>
      {cartPage && (
        <>
          <div
            className="CartItem__Actions Heading Text--subdued"
            style={{ textAlign: "center" }}
          >
            <div className="CartItem__QuantitySelector">
              <div className="QuantitySelector">
                <button
                  className="QuantitySelector__Button Link Link--primary"
                  title="קבע כמות ל0"
                  onClick={() => dispatch(RemoveItem(item))}
                >
                  <svg
                    className="Icon Icon--minus"
                    role="presentation"
                    viewBox="0 0 16 2"
                  >
                    <path
                      d="M1,1 L15,1"
                      stroke="currentColor"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="square"
                    ></path>
                  </svg>
                </button>

                <input
                  type="text"
                  pattern="[0-9]"
                  onChange={(e) => {
                    const quantity = Number(e.target.value);
                    if (isNaN(quantity)) {
                      return;
                    }
                    dispatch(updateItemQuantity(item, quantity));
                  }}
                  className="QuantitySelector__CurrentQuantity"
                  value={item.quantity}
                />
                <button
                  className="QuantitySelector__Button Link Link--primary"
                  title={`Set quantity to ${item.quantity + 1}`}
                  onClick={() => dispatch(addItem(item))}
                >
                  <svg
                    className="Icon Icon--plus"
                    role="presentation"
                    viewBox="0 0 16 16"
                  >
                    <g
                      stroke="currentColor"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="square"
                    >
                      <path d="M8,1 L8,15"></path>
                      <path d="M1,8 L15,8"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>

            <span
              className="CartItem__Remove Link Link--underline Link--underlineShort"
              data-quantity="0"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(clearItemFromCart(item))}
            >
              Remove
            </span>
          </div>
          <div
            className="CartItem__LinePriceList Heading Text--subdued"
            style={{ textAlign: "right" }}
          >
            <span className="CartItem__Price Price">${item.price}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(CartItem);
