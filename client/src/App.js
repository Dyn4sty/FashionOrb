import React, { useEffect, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Header from "./components/header/header";
// import Footer from './components/footer/Footer'
import { checkUserSession } from "./redux/user/users.actions";
import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PublicRoute from "./routes/public-route";
import PrivateRoute from "./routes/private-route";

// Lazy Load Pages.
const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shop/shop"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout"));
const ContactPage = lazy(() => import("./pages/contact/contact"));
const SignInAndRegister = lazy(() =>
  import("./pages/LoginAndRegister/LoginAndRegister")
);

const App = ({ currentUser, checkUserSession }) => {
  const unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
    return () => {
      unsubscribeFromAuth();
    };
  }, [checkUserSession]);

  return (
    <React.Fragment>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <PublicRoute
              restricted={false}
              exact
              path={["/", "/home"]}
              restr
              component={HomePage}
            />
            <PublicRoute restricted={false} path="/shop" component={ShopPage} />
            <PublicRoute
              restricted={false}
              exact
              path="/contact"
              component={ContactPage}
            />
            <PublicRoute
              restricted={true}
              exact
              path="/signin"
              component={SignInAndRegister}
            />
            <PrivateRoute exact path="/checkout" component={CheckoutPage} />
            <PublicRoute restricted={false} component={PageNotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
