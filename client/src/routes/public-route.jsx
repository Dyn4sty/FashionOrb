import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../components/Spinner/Spinner";
  import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsFetching,
} from "../redux/user/user.selectors";

const PublicRoute = ({
  component: Component,
  restricted,
  currentUser,
  isFetching,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        if (!restricted) {
          return <Component {...props} />;
        }
        if (isFetching) {
          return <Spinner />;
        } else if (currentUser && restricted) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetching: selectIsFetching,
});
export default connect(mapStateToProps)(PublicRoute);
