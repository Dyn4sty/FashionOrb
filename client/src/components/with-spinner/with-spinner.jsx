import React from "react";
import Spinner from "../Spinner/Spinner";

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) =>
  isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;

export default WithSpinner;
