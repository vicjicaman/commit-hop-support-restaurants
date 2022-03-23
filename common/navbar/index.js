import React from "react";

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
import { FormattedMessage } from "react-intl";
import * as Lang from "common/lang";

const NavItemCommon = ({ lang, id, tag, href }) => {
  const target = `/${lang}${href}`;
  return tag ? (
    <NavLink
      className="text-capitalize"
      tag={tag}
      to={target}
      active={window.location.pathname === target}
    >
      <FormattedMessage id={id} />
    </NavLink>
  ) : (
    <NavLink className="text-capitalize" href={target}>
      <FormattedMessage id={id} />
    </NavLink>
  );
};

export default ({ lang, tag }) => {
  const props = { lang, tag };
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href={`/${lang}`}>
        <FormattedMessage id="app.title" />
      </NavbarBrand>

      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavItemCommon {...props} id={"app.map"} href={""} />
          </NavItem>
          <NavItem>
            <NavItemCommon {...props} id={"app.search"} href={"/search"} />
          </NavItem>
          <NavItem>
            <NavItemCommon {...props} id={"app.listing"} href={"/listing"} />
          </NavItem>
          <NavItem>
            <NavItemCommon {...props} id={"app.admin"} href={"/admin"} />
          </NavItem>
          <NavItem>
            <NavItemCommon {...props} id={"app.donate"} href={"/donate"} />
          </NavItem>
          <Lang.Selector lang={lang} />
        </Nav>
      </Collapse>
    </Navbar>
  );
};
