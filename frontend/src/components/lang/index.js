import React, { useContext, useState, useMemo } from "react";
import _ from "lodash";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

const flagStyle = { width: "2em", border: 0 };
const options = [
  { lang: "en", flag: "us", label: "English" },
  { lang: "pl", flag: "pl", label: "Polish" },
  { lang: "fr", flag: "fr", label: "French" },
  { lang: "ua", flag: "ua", label: "Ukrainian" },
  { lang: "ro", flag: "ro", label: "Romanian" },
];
const flagUrl = (flag) => `/backend/static/flags/${flag}.png`;

export const Selector = ({}) => {
  const navegate = useNavigate();
  const params = useParams();
  const { lang: current } = params;

  const currFlag = _.find(options, { lang: current });

  if (!currFlag) {
    return null;
  }

  const opts = _.map(options, (key, i) => (
    <DropdownItem
      tag={"a"}
      key={i}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        const ck = key.lang;
        //setLang(ck);
        navegate(`/${ck}`);
      }}
    >
      <img style={flagStyle} key={key} src={flagUrl(key.flag)} /> {key.label}
    </DropdownItem>
  ));

  return (
    <UncontrolledDropdown setActiveFromChild>
      <DropdownToggle tag={"a"} className="nav-link" caret>
        <img style={flagStyle} src={flagUrl(currFlag.flag)} />
      </DropdownToggle>
      <DropdownMenu>{opts}</DropdownMenu>
    </UncontrolledDropdown>
  );
};
