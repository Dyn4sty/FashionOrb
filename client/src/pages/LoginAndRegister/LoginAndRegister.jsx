import React from "react";
import SignIn from "../../components/Signin/Signin";
import Signup from "../../components/Signup/Signup";
import { SignPageContainer } from "./LoginAndRegister.styles";

const SignInAndRegister = () => {
  return (
    <SignPageContainer>
      <SignIn />
      <Signup />
    </SignPageContainer>
  );
};

export default SignInAndRegister;
