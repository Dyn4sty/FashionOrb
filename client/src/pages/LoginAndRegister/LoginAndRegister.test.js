import React from "react";
import { shallow } from "enzyme";
import LoginAndRegister from "./LoginAndRegister";

it("should render LoginAndRegister component", () => {
  expect(
    shallow(<LoginAndRegister location={{ pathname: "/auth" }} />)
  ).toMatchSnapshot();
});
