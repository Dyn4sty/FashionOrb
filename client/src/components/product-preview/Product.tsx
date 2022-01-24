import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addItem, openAndCloseCart } from "../../redux/cart/cart.actions";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { Container, Row, Col, Form } from "react-bootstrap";
import { createStructuredSelector } from "reselect";
import CustomButton from "../custom-button/custom-button";
import { selectProduct } from "../../redux/shop/shop.selectors";
import { addCommentStart } from "../../redux/shop/shop.actions";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import {
  NewArrivalBadge,
  PriceContent,
  StyledCol,
  MyContainer,
} from "./Product.styles";
import CommentList from "./Comments";
import Editor from "./Editor";
import { Comment, Avatar, Rate, Image, CommentProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { firestore } from "../../firebase/firebase.utils";
import { Tabs } from "antd";
const { TabPane } = Tabs;

interface matchProp {
  params: {
    collectionId: string;
    itemId?: string;
  };
  url: string;
}
interface IComment extends CommentProps {
  user?: any;
}
interface itemProp {
  name: string;
  price: string;
  imageUrl: string;
  sizes: string[];
  collectionId: string;
  comments: IComment[];
  category: string;
  id: string;
}

interface ProductProps {
  item?: itemProp;
  addItem: (item: itemProp) => void;
  openAndCloseCart: (hidden: boolean) => void;
  addCommentStart: (item: itemProp, comment: Comment) => void;
  match: matchProp;
  user: any;
}

const Product = ({
  item,
  addItem,
  openAndCloseCart,
  match,
  addCommentStart,
  user,
}: ProductProps): JSX.Element => {
  let unsubscribe: { (): void; (): void };
  const [currentItem, setCurrentItem] = useState!(item);
  useEffect(() => {
    if (item) {
      unsubscribe = firestore
        .collection("collections")
        .doc(item.category.slice(0, 1).toUpperCase() + item.category.slice(1))
        .onSnapshot(function (doc) {
          const existingItem = doc.data()!.items.find((itemToFind: any) =>  itemToFind.id === item.id
          );
          if (existingItem) {
            setCurrentItem(existingItem)
          }
        });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [item]);
  if (!item) {
    return <PageNotFound />;
  }
  const { name, price, imageUrl, sizes, comments } = currentItem!;
  const { collectionId } = match.params;
  return (
    <MyContainer>
      <Breadcrumb routes={match.url.split("/")} />

      <Container>
        <Row>
          <Col md={6}>
            <Image placeholder className="img-fluid" src={imageUrl} />
          </Col>
          <StyledCol md={6}>
            <NewArrivalBadge>NEW</NewArrivalBadge>
            <h2 style={{ color: "#555" }}>{name}</h2>
            <p>
              Product Code: <strong>ISRC2020</strong>
            </p>
            <Rate
              disabled={!user}
              defaultValue={4}
              style={{ fontSize: "1rem" }}
            />
            <PriceContent>USD: ${price}</PriceContent>
            <Form.Group  className="mb-3">
              <Form.Label>SIZE:</Form.Label>
              <Form.Control as="select">
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
                addItem({ ...item, collectionId });
              }}
            >
              Add to Cart
            </CustomButton>
          </StyledCol>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Description" key="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, temporibus accusamus iure quia sapiente cupiditate facere blanditiis error ipsam suscipit assumenda aliquid aperiam pariatur necessitatibus, labore animi reprehenderit minima eligendi?
              </TabPane>
              <TabPane tab="Reviews" key="2">
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                  avatar={
                    <Avatar
                      src={user?.photoURL}
                      icon={<UserOutlined />}
                      alt={user?.displayName}
                    />
                  }
                  content={
                    <Editor
                      addCommentStart={(comment: Comment) => {
                        console.log("meow");
                        addCommentStart(item, comment);
                      }}
                      user={user}
                    />
                  }
                />
              </TabPane>
              <TabPane tab="Custom Tab" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </MyContainer>
  );
};
const mapStateToProps = (
  state: any,
  {
    match: {
      params: { collectionId, itemId },
    },
  }: {
    match: matchProp;
  }
) =>
  createStructuredSelector({
    item: selectProduct(collectionId, itemId),
    user: selectCurrentUser,
  });

const mapDispatchToProps = (dispatch: any) => ({
  addItem: (item: itemProp) => dispatch(addItem(item)),
  openAndCloseCart: (hidden: boolean) => dispatch(openAndCloseCart(hidden)),
  addCommentStart: (item: itemProp, comment: Comment) =>
    dispatch(addCommentStart(item, comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Product));
