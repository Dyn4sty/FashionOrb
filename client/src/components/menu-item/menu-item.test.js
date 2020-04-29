import React from "react";
import { shallow } from "enzyme";

import { MenuItem } from "./menu-item";

describe("MenuItem", () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  const linkUrl = "shop/hats";
  const size = "large";
  const imageUrl = "testimage";

  beforeEach(() => {
    mockMatch = {
      url: "/",
    };
    mockHistory = {
      push: jest.fn(),
    };

    const mockProps = {
      match: mockMatch,
      history: mockHistory,
      linkUrl,
      title: "hats",
      imageUrl,
      size,
    };

    wrapper = shallow(<MenuItem {...mockProps} />);
  });

  it("should render MenuItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call history.push with the right string when MenuItemContainer clicked", () => {
    wrapper.find("MenuItemContainer").simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${linkUrl}`);
  });

  it("should pass size to MenuItemContainer as the prop size", () => {
    expect(wrapper.find("MenuItemContainer").prop("size")).toBe(size);
  });
  it("should pass imageUrl to BackgroundImageContainer as the prop ImageUrl", () => {
    expect(wrapper.find("BackgroundImageContainer").prop("imageUrl")).toBe(
      imageUrl
    );
  });
});
