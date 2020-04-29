import React from "react";
import { shallow } from "enzyme";
import SignInAndRegister from "./LoginAndRegister";

it("should render SignInAndRegister component", () => {
  expect(shallow(<SignInAndRegister />)).toMatchSnapshot();
});
