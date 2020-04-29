import React from "react";
import { shallow } from "enzyme";
import HomePage from "./homepage";

it("should render HomePage component", () => {
  expect(shallow(<HomePage />)).toMatchSnapshot();
});
