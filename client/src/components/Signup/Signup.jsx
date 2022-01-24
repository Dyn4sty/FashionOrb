import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/users.actions";
import FormInput from "../form-input/forum-input";
import CustomButton from "../custom-button/custom-button";
import swal from "sweetalert";
import {
  SignUpContainer,
  TitleContainer,
  SignInButtonsContainer,
} from "./sign-up.styles";
import { captchaValidator } from "../../pages/LoginAndRegister/captchaValidator";
import { Prompt } from "react-router-dom";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isFetching, setisFetching] = useState(false);

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!displayName || !email || !password || password !== confirmPassword) {
      swal("Oops", "Invalid Fields", "error");
      return;
    }
    setisFetching(true);
    try {
      const { success, score } = await captchaValidator();
      if (score < 0.5 || !success) {
        swal("Are u a Robot?", "Your Behaivor is simillar to a robot.", "info");
        return;
      }
      signUpStart({ email, password, displayName });
      setisFetching(false);
    } catch (err) {
      swal(
        "Something Went Wrong..",
        err || "Could not process your request",
        "error"
      );
      setisFetching(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <Prompt
        when={!!displayName || !!email || !!password}
        message="Are you sure you want to leave?"
      />
      <TitleContainer className="title">
        I do not have an account
      </TitleContainer>
      <span>Sign Up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          handleChange={handleChange}
          label="Name"
          required
          pattern="[A-Za-z]{1,32}"
        />
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
          minLength="6"
          value={password}
          handleChange={handleChange}
          label="Password"
          autocomplete="on"
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          minLength="6"
          label="Confirm Password"
          required
        />
        <SignInButtonsContainer>
          <CustomButton disabled={isFetching} type="submit">
            <span id="button-text">
              {isFetching ? (
                <div className="spinner-grow" id="spinner"></div>
              ) : (
                "Sign up"
              )}
            </span>
          </CustomButton>
        </SignInButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (user) => dispatch(signUpStart(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
