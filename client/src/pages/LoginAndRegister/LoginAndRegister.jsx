import React, { useEffect } from "react";
import { Switch, Link } from "react-router-dom";
import SignIn from "../../components/Signin/Signin";
import Signup from "../../components/Signup/Signup";
import {
  SignPageContainer,
  RoutesContainer,
  Logo,
} from "./LoginAndRegister.styles";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PublicRoute from "../../routes/public-route";
import PageNotFound from "../PageNotFound/PageNotFound";

const LoginAndRegister = ({ location, match }) => {
  useEffect(() => {
    const badge = document.querySelector(".grecaptcha-badge");
    if (badge) {
      badge.style.visibility = "visible";
    }
    return () => {
      if (badge) {
        badge.style.visibility = "hidden";
      }
    };
  }, []);

  // const location = useLocation();
  const currentKey = location.pathname.split("/auth")[1] || "/";
  return (
    <SignPageContainer>
      {!currentKey.match(/((\/|\/signup)$)/) ? (
        <PublicRoute component={PageNotFound} />
      ) : (
        <>
          <Logo />
          <RoutesContainer>
            <Link
              to="/auth"
              className={
                location.pathname.match(/\/auth\/?$/) ? "activetab" : ""
              }
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className={
                location.pathname === "/auth/signup" ? "activetab" : ""
              }
            >
              Register
            </Link>
          </RoutesContainer>
          <TransitionGroup component="div" className="App">
            <CSSTransition
              key={currentKey}
              timeout={{ enter: 800, exit: 0 }}
              classNames="pageSlider"
              mountOnEnter={false}
              unmountOnExit={true}
            >
              <div className="fades">
                <Switch>
                  <PublicRoute
                    restricted={true}
                    exact
                    path="/auth"
                    component={SignIn}
                  />
                  <PublicRoute
                    restricted={true}
                    exact
                    path="/auth/signup"
                    component={Signup}
                  />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </>
      )}
    </SignPageContainer>
  );
};

export default LoginAndRegister;
