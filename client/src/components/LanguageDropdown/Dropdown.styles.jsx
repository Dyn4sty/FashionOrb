import styled from "styled-components";
import { Dropdown } from "react-bootstrap";

export const DropdownToggle = styled(Dropdown.Toggle)`
  @media (max-width: 991px) {
    .language {
      display: none;
      border-radius: 0.75rem;
    }
    padding: 0;
  }
  &.btn {
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
    color: black !important;
    background-color: white !important;
    border-color: white !important;
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.5) !important;
    font-size: 14px;
    ::after {
      margin: 0;
      border: none;
    }
    :hover {
      text-decoration: none !important;
      background-color: rgba(0, 0, 0, 0.04) !important;
      border-color: white !important;
    }
  }
`;
export const DropdownItem = styled(Dropdown.Item)`
  &.active {
    color: black !important;
    text-decoration: none;
    background-color: whitesmoke;
  }
  &:active {
    color: black !important;
    background-color: whitesmoke !important;
  }
`;
