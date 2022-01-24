import React from "react";
import FormInput from "../form-input/forum-input";
import { connect, useSelector } from "react-redux";
import CustomButton from "../custom-button/custom-button";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/users.actions";
import { selectIsFetching } from "../../redux/user/user.selectors";
import GoogleButton from "../GoogleButton/GoogleButton";
import { Prompt } from "react-router-dom";
import swal from "sweetalert";
import { captchaValidator } from "../../pages/LoginAndRegister/captchaValidator";
import {
  SignInButtonsContainer,
  SignInContainer,
  TitleContainer,
} from "./Signin.styles";
import { useLocation, useHistory } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [userCredentials, setCredentials] = useLocalStorage("SignInData", {
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/" } };
  const isFetching = useSelector(selectIsFetching);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      swal("Oops", "Invalid Fields", "error");
      return;
    }
    // Starting to Fetch
    try {
      const { success, score } = await captchaValidator();
      if (score < 0.5 || !success) {
        swal("Are u a Robot?", "Your Behaivor is simillar to a robot.", "info");
        return;
      }
      emailSignInStart(email, password, history, from);
    } catch (err) {
      swal(
        "Something Went Wrong..",
        err || "Could not process your request",
        "error"
      );
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <Prompt
        when={!!email || !!password}
        message="Are you sure you want to leave?"
      />

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
          disabled={isFetching}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          disabled={isFetching}
        />
        <SignInButtonsContainer>
          <CustomButton disabled={isFetching} type="submit">
            {isFetching && (
              <div class="text-center">
                <div
                  class="spinner-border spinner-border-sm mr-2"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!isFetching ? "Sign in" : "Loading.."}
          </CustomButton>
          <GoogleButton
            disabled={isFetching}
            type="button"
            onClick={() => googleSignInStart(history, from)}
          >
            {isFetching && (
              <div
                class="spinner-border spinner-border-sm mr-2"
                role="status"
              ></div>
            )}
            {!isFetching ? "Sign in With Google" : "LOADING.."}
          </GoogleButton>
        </SignInButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: (history, from) =>
    dispatch(googleSignInStart({ history, from })),
  emailSignInStart: (email, password, history, from) =>
    dispatch(emailSignInStart({ email, password, history, from })),
});

export default connect(null, mapDispatchToProps)(React.memo(SignIn));
