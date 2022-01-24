import React, { useState, useEffect, useCallback, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/Orb.svg";
import { signOutStart } from "../../redux/user/users.actions";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import PropTypes from "prop-types";

// Components
import CartSideDrawer from "../cart-sideDrawer/cart-sideDrawer.container";
import CartIcon from "../cart-icon/cart-icon";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import useWindowSize from "../../hooks/useWindowSize";
import { HeaderContainer } from "./header.styles";

const Header = React.memo(({ currentUser, hidden, signOut }) => {
  const [fixed, setFixed] = useState(false);
  const size = useWindowSize();

  const handleScroll = useCallback(() => {
    // fixed navbar
    if (window.scrollY > 200 && !fixed) {
      setFixed(true);
    }
    // reset navbar
    if (window.scrollY < 200 && fixed) {
      setFixed(false);
    }
  }, [fixed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // A Clean Up Function -> Serves As ComponentWillUnMount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const fixedStr = useMemo(() => (fixed ? "fixed" : ""), [fixed]);
  return (
    <>
      <HeaderContainer fixed={fixedStr}>
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="light"
          variant="light"
          sticky="top"
        >
          <Container fluid={true}>
            <Navbar.Brand href="#home" as={Link} to="/" aria-label="Header">
              <Logo />
            </Navbar.Brand>
            {size.width < 576 && (
              <>
                <CartIcon hidden={hidden} id="cart-icon" />
              </>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item style={{ padding: "0px" }}>
                  <LanguageDropdown />
                </Nav.Item>
                <Nav.Link eventKey="2" as={NavLink} to="/" aria-label="Home">
                  Home
                </Nav.Link>
                <Nav.Link
                  eventKey="3"
                  as={NavLink}
                  to="/shop"
                  activeClassName="is-active"
                  aria-label="Shop"
                >
                  Shop
                </Nav.Link>
                <Nav.Link
                  eventKey="4"
                  as={NavLink}
                  to="/contact"
                  activeClassName="is-active"
                  aria-label="Contact"
                >
                  Contact
                </Nav.Link>
                {currentUser ? (
                  <Nav.Link>
                  <span className="name mr-1">
                    {currentUser.displayName}
                  </span>
                  <span>
                    <img
                      alt="Profile"
                      id="profile-img"
                      src={
                        currentUser.photoURL ||
                        "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                      }
                    />
                  </span>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    eventKey="8"
                    as={NavLink}
                    to="/auth"
                    activeClassName="is-active"
                    aria-label="Signin"
                  >
                    Sign In
                  </Nav.Link>
                )}
                {size.width >= 576 && (
                  <Nav.Link eventKey="9" aria-label="Cart Icon">
                    <CartIcon hidden={hidden} id="cart-icon" />
                  </Nav.Link>
                )}
                <CartSideDrawer hidden={hidden} />
                <div
                  className={`PageOverlay ${hidden ? "" : "is-visible"}`}
                ></div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </HeaderContainer>
    </>
  );
});

Header.propTypes = {
  currentUser: PropTypes.object,
  hidden: PropTypes.bool,
  signOut: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
