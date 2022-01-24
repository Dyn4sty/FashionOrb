import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionFooterContainer,
  CollectionItemContainer,
  ImageContainer,
  NameSpan,
  PriceSpan,
  AddButton,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem, openAndCloseCart, collectionId }) => {
  const { name, price, imageUrl } = item;
  return (
    <CollectionItemContainer>
      <Link
        to={{
          pathname: `/shop/${collectionId}/${name}`,
        }}
      >
        <ImageContainer loading="lazy" src={imageUrl} />
      </Link>
      <CollectionFooterContainer>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>${price} </PriceSpan>
      </CollectionFooterContainer>
      <AddButton
        inverted
        onClick={() => {
          addItem({ ...item, collectionId });
        }}
      >
        Add to Cart
      </AddButton>
    </CollectionItemContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
