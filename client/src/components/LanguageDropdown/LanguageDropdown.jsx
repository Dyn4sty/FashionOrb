import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownToggle, DropdownItem } from "./Dropdown.styles";
import i18n from "../../Internationalization/i18n";

import USA from "../../assets/flags/us.jpg";
import ISRAEL from "../../assets/flags/israel.jpg";

const LanguageDropdown = () => {
  const [menu, toggleMenu] = useState(false);
  const [lng, setLanguage] = useState("English");
  const [flag, setFlag] = useState(USA);

  const changeLanguageAction = (lng) => {
    if (lng === i18n.language) {
      return;
    }
    i18n.changeLanguage(lng);
    if (lng === "he") {
      setFlag(ISRAEL);
      setLanguage("Hebrew");
    } else if (lng === "eng") {
      setFlag(USA);
      setLanguage("English");
    }
    document.documentElement.lang = lng;
  };

  return (
    <React.Fragment>
      <Dropdown
        navbar={true}
        // isOpen={menu}
        onToggle={() => toggleMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle tag="select">
          <img src={flag} alt="Skote" height="16" className="mr-1 ml-1" />
          <span className="align-middle language">{lng}</span>
        </DropdownToggle>
        <Dropdown.Menu>
          <DropdownItem
            eventKey={1}
            onClick={() => changeLanguageAction("eng")}
            className={`notify-item ${lng === "English" ? "active" : "none"}`}
          >
            <img src={USA} alt="US" className="mr-1" height="12" />
            <span className="align-middle">English</span>
          </DropdownItem>
          <DropdownItem
            tag="a"
            href="#"
            onClick={() => changeLanguageAction("he")}
            className={`notify-item ${lng === "Hebrew" ? "active" : "none"}`}
          >
            <img src={ISRAEL} alt="Israel" className="mr-1" height="12" />
            <span className="align-middle">Hebrew</span>
          </DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
