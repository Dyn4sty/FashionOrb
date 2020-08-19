import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";

// import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsFetching,
} from "../redux/user/user.selectors";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isFetching = useSelector(selectIsFetching);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isFetching) {
          return <Spinner />;
        } else if (!currentUser) {
          return <Redirect to="/auth" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default connect()(PrivateRoute);
