import React, { useState } from "react";
import FormInput from "../form-input/forum-input";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/users.actions";
import GoogleButton from "../GoogleButton/GoogleButton";

import swal from "sweetalert";
import { captchaValidator } from "../../pages/LoginAndRegister/captchaValidator";
import {
  SignInButtonsContainer,
  SignInContainer,
  TitleContainer,
} from "./Signin.styles";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    captchaValidator((err, data) => {
      if (err) {
        swal("Something Went Wrong..", err, "error");
        return;
      }
      const { success, score } = data;
      if (score < 0.5 && success) {
        swal("Are u a Robot?", "Your Behaivor is simillar to a robot.", "info");
        return;
      }
      emailSignInStart(email, password);
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign In with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
        />
        <SignInButtonsContainer>
          <CustomButton type="submit">Sign in</CustomButton>
          <GoogleButton type="button" onClick={googleSignInStart}>
            Sign in With Google
          </GoogleButton>
        </SignInButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
