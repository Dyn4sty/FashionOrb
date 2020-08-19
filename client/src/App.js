import React, { useEffect, lazy, Suspense } from "react";
import { Switch, useLocation } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";
import { checkUserSession } from "./redux/user/users.actions";
import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PublicRoute from "./routes/public-route";
import PrivateRoute from "./routes/private-route";
import { subscribeToNotifications } from "./firebase/firebase.utils";
// import { useTranslation } from "react-i18next";

// Lazy Load Pages.
const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const CheckoutContainer = lazy(() =>
  import("./pages/checkout/checkout.container")
);
const ContactPage = lazy(() => import("./pages/contact/contact"));
// const AccountPage = lazy(() => import("./pages/account/account"));

const LoginAndRegister = lazy(() =>
  import("./pages/LoginAndRegister/LoginAndRegister")
);

const App = ({ checkUserSession }) => {
  /*
   * TODO:
   * TypeScript
   * Testing
   * AccountPage
   */
  // const { i18n } = useTranslation();

  const unsubscribeFromAuth = null;
  useEffect(() => {
    subscribeToNotifications();
    checkUserSession();
    return () => {
      unsubscribeFromAuth();
    };
  }, [checkUserSession]);
  const location = useLocation();

  return (
    <React.Fragment>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PublicRoute exact path={["/", "/home"]} component={HomePage} />
            <PublicRoute path="/shop" component={ShopPage} />
            <PublicRoute restricted path="/auth" component={LoginAndRegister} />
            <PublicRoute exact path="/contact" component={ContactPage} />
            <PrivateRoute
              exact
              path="/checkout"
              component={CheckoutContainer}
            />
            <PublicRoute component={PageNotFound} />
          </Switch>
        </Suspense>
        {!location.pathname.match(/^\/$|\/+(home|checkout|contact|shop)$/) ? (
          <></>
        ) : (
          <Footer />
        )}
      </ErrorBoundary>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
