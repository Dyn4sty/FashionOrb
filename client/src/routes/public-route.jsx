import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const auth = useSelector(selectCurrentUser);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          auth && restricted ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
};

export default PublicRoute;
