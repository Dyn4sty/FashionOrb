import React, { useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { Switch, useLocation } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";
import { checkUserSession } from "./redux/user/users.actions";
import { selectIsFetching } from "./redux/user/user.selectors";

import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PublicRoute from "./routes/public-route";
import PrivateRoute from "./routes/private-route";
import NotificationModal from "./components/notification-modal/NotificationModal";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";

// Lazy Load Pages.
const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.container"));
const ContactPage = lazy(() => import("./pages/contact/contact"));
const AccountPage = lazy(() => import("./pages/account/account"));
const CartPage = lazy(() => import("./pages/cart/cart"));
const LoginAndRegister = lazy(() =>
  import("./pages/LoginAndRegister/LoginAndRegister")
);

function getTitle(pathnames) {
  const baseRoutes = pathnames.split("/");
  const routes = [];
  for (let i = 0; i < baseRoutes.length; i++) {
    let route = baseRoutes[i];
    if (route) {
      if (baseRoutes[1] === "shop" && baseRoutes.length === 4 && i < 3) {
        continue;
      }
      if (i === 0) route = "FashionOrb";
      if (route === "auth") {
        if (i === baseRoutes.length - 1) {
          routes.push("SignIn");
        }
        continue;
      }
    }
    routes.push(route.slice(0, 1).toUpperCase() + route.slice(1));
  }
  routes[0] = "FashionOrb";
  return routes.filter((route) => route).join(" | ");
}

const App = ({ checkUserSession, fetching }) => {
  /*
   * TODO:
   * TypeScript
   * Testing
   * AccountPage
   */

  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let loaderTimeout;
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      // fade out

      loaderTimeout = setTimeout(() => {
        ele.classList.add("available");
        // remove from DOM
        setTimeout(() => {
          ele.outerHTML = "";
        }, 436);
      }, 1000);
    }
    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);
  
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const title = getTitle(location.pathname);
  if (fetching) return null;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta></meta>
      </Helmet>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PublicRoute exact path={["/", "/home"]} component={HomePage} />
            <PublicRoute path="/shop" component={ShopPage} />
            <PublicRoute restricted path="/auth" component={LoginAndRegister} />
            <PublicRoute exact path="/contact" component={ContactPage} />
            <PublicRoute exact path="/cart" component={CartPage} />
            <PrivateRoute exact path="/checkout" component={CheckoutPage} />
            <PrivateRoute
              restricted
              exact
              path="/my-account"
              component={AccountPage}
            />

            <PublicRoute component={PageNotFound} />
          </Switch>
        </Suspense>
        {!location.pathname.match(
          /^\/$|\/+(home|cart|checkout|contact|my-account|shop\/*)$/
        ) ? (
          <></>
        ) : (
          <>
            {!["granted", "denied"].find(
              (item) => Notification.permission === item
            ) && <NotificationModal />}
            <Footer />
          </>
        )}
      </ErrorBoundary>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
  fetching: selectIsFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
