import React from "react";
import { sections } from "./directory.data";
import MenuItem from "../menu-item/menu-item";
import { DirectoryMenuContainer } from "./directory.styles";
class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections,
    };
  }
  render() {
    return (
      <DirectoryMenuContainer>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </DirectoryMenuContainer>
    );
  }
}

export default Directory;
