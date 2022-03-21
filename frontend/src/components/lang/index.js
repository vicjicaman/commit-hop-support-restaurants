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
  { code: "us", label: "English" },
  { code: "pl", label: "Polish" },
  { code: "ua", label: "Ukrainian" },
  { code: "ro", label: "Romanian" },
];
const flagUrl = (code) => `/backend/static/flags/${code}.png`;

export const Selector = ({}) => {
  const navegate = useNavigate();
  const params = useParams();
  const { lang: current } = params;

  const opts = _.map(options, (key, i) => (
    <DropdownItem
      tag={"a"}
      key={i}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        const ck = key.code;
        //setLang(ck);
        navegate(`/${ck}`);
      }}
    >
      <img style={flagStyle} key={key} src={flagUrl(key.code)} /> {key.label}
    </DropdownItem>
  ));

  return (
    <UncontrolledDropdown setActiveFromChild>
      <DropdownToggle tag={"a"} className="nav-link" caret>
        <img style={flagStyle} src={flagUrl(current)} />
      </DropdownToggle>
      <DropdownMenu>{opts}</DropdownMenu>
    </UncontrolledDropdown>
  );
};
