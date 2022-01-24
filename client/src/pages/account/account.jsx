import React, { useEffect, useState } from "react";
import Invoice from "../../components/invoice/invoice.component";
import BannerItem from "../../components/banner-item/banner-item";
import rootBanner from "../../assets/rootBanner.jpg";
import { useTranslation } from "react-i18next";
import {
  selectCartItems,
  SelectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { useSelector } from "react-redux";
import firebase, { auth, googleProvider } from "../../firebase/firebase.utils";
import swal from "sweetalert";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomButton from "../../components/custom-button/custom-button";

const AccountPage = () => {
  const { t } = useTranslation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(SelectCartTotal);
  const user = useSelector(selectCurrentUser);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.table(user);
  });

  async function reAuthenticate() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        if (currentUser.providerData.length <= 1) {
          const credential = firebase.auth.EmailAuthProvider.credential(
            currentUser.email,
            "dasdsad"
          );
          await currentUser.reauthenticateWithCredential(credential);
        }
        const result = await currentUser.reauthenticateWithPopup(
          googleProvider
        );
      } catch (error) {
        console.log(error);
        swal("Oops", error.message, "error");
      }
    }
  }

  return (
    <>
      <BannerItem
        bannertype="center"
        background={rootBanner}
        bannerheight="500px"
      >
        <h1 style={{ textTransform: "capitalize" }}>My Account</h1>
      </BannerItem>
      {!authenticated && (
        <Container>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={user.email} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
            <div class="d-flex justify-content-center">
              <CustomButton type="submit">Submit</CustomButton>
            </div>
          </Form>
        </Container>
      )}
      {/* <Invoice items={cartItems} total={cartTotal} user={user} /> */}
    </>
  );
};

export default AccountPage;
