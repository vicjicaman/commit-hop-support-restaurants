import React from "react";
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

export const flagStyle = { width: "2em", border: 1, borderColor: "black", borderStyle: "solid" };
const options = [
  { lang: "en", flag: "us", label: "English" },
  { lang: "pl", flag: "pl", label: "Polish" },
  { lang: "fr", flag: "fr", label: "French" },
  { lang: "uk", flag: "ua", label: "Ukrainian" },
  { lang: "ro", flag: "ro", label: "Romanian" },
  { lang: "es", flag: "mx", label: "Spanish" },
  { lang: "sk", flag: "sk", label: "Slovak" },
  { lang: "de", flag: "de", label: "German" },
  { lang: "hu", flag: "hu", label: "Hungarian" },
];

// Remove... made it work within getProps method, but I will use a relative url for simplicity from now
//const SCOPE = process.env.NEXT_PUBLIC_SCOPE || "dev";
const flagUrl = (flag) => `/flags/${flag}.png`;

export const Selector = ({ lang: current }) => {
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
        //navegate(`/${ck}`);
        // Just for the demo, replace the current lang with the target, TODO: take care of the multiple bases
        const currpath = window.location.pathname;
        window.location.href = currpath.replace(`/${current}`, `/${ck}`);
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
