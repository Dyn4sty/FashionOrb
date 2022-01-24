import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
} from "./forum-input.styles";

const FormInput = ({ handleChange, label, value, abbr, ...props }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} value={value} {...props} />
    {label ? (
      <FormInputLabel className={value.length ? "shrink" : ""}>
        {label}
        {abbr && (
          <abbr className="required" title="required">
            *
          </abbr>
        )}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
