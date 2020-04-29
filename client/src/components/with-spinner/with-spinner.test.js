import React from "react";
import { shallow } from "enzyme";
import WithSpinner from "./with-spinner";
import Spinner from "../Spinner/Spinner";

describe("WithSpinner HOC", () => {
  const TestComponent = () => <div className="test" />;
  const WrappedComponent = WithSpinner(TestComponent);

  describe("if loading is true", () => {
    const wrapper = shallow(<WrappedComponent isLoading={true} />);
    it("should render Spinner", () => {
      expect(wrapper.exists(Spinner)).toBe(true);
    });
    it("shouldn't render TestComponent ", () => {
      expect(wrapper.exists(TestComponent)).toBe(false);
    });
  });

  describe("if loading is false", () => {
    const wrapper = shallow(<WrappedComponent isLoading={false} />);
    it("should render TestComponent", () => {
      expect(wrapper.exists(TestComponent)).toBe(true);
    });
    it("shouldn't render Spinner", () => {
      expect(wrapper.exists(Spinner)).toBe(false);
    });
  });
});
