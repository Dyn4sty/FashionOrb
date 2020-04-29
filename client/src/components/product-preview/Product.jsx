import React from "react";
import { connect } from "react-redux";
import { addItem, openAndCloseCart } from "../../redux/cart/cart.actions";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { Container, Row, Col, Form, Image } from "react-bootstrap";

import CustomButton from "../custom-button/custom-button";

import { NewArrivalBadge, PriceContent, StyledCol } from "./Product.styles";

const Product = ({
  addItem,
  openAndCloseCart,
  match,
  location: {
    state: { item },
  },
}) => {
  const { name, price, imageUrl, sizes } = item;
  const { collectionId } = match.params;

  return (
    <>
      <Breadcrumb routes={match.url.split("/")} />
      <Container>
        <Row>
          <Col md={6}>
            {" "}
            <Image fluid width="500" src={imageUrl} />{" "}
          </Col>
          <StyledCol md={6}>
            <NewArrivalBadge>NEW</NewArrivalBadge>
            <h2 style={{ color: "#555" }}>{name}</h2>
            <p>
              Product Code: <strong>ISRC2020</strong>
            </p>
            <PriceContent>USD: ${price}</PriceContent>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>SIZE:</Form.Label>
              <Form.Control as="select" custom>
                {sizes ? (
                  sizes.sort().map((size) => <option>{size}</option>)
                ) : (
                  <>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <CustomButton
              onClick={() => {
                openAndCloseCart(false);
                setTimeout(() => openAndCloseCart(true), 4000);
                addItem({ ...item, collectionId });
              }}
            >
              Add To Bag
            </CustomButton>
          </StyledCol>
        </Row>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  openAndCloseCart: (hidden) => dispatch(openAndCloseCart(hidden)),
});

export default connect(null, mapDispatchToProps)(Product);
