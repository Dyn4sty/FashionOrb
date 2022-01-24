import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { openAndCloseCart } from "../../redux/cart/cart.actions";
import {
  selectCartItemsCount,
  selectCartHidden,
} from "../../redux/cart/cart.selectors";
import { useHistory } from "react-router-dom";
import {
  CartIconContainer,
  ItemCountContainer,
  StyledShoppingIcon,
} from "./cart-icon.styles";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

const CartIcon = ({ dispatch, itemCount, hidden }) => {
  const history = useHistory();
  return (
    <CartIconContainer
      onClick={() => {
        if (window.innerWidth > 576) {
          dispatch(openAndCloseCart(false));
        } else {
          history.push("/cart");
        }
      }}
      isHidden={hidden}
    >
      <Badge size="small" count={itemCount} overflowCount={99}>
        <ShoppingCartOutlined style={{ fontSize: "24px" }} />
      </Badge>
      {/* <ItemCountContainer>{itemCount}</ItemCountContainer> */}
    </CartIconContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  cartHidden: selectCartHidden,
});
export default connect(mapStateToProps)(CartIcon);
