import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(selectCurrentUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default connect()(PrivateRoute);
