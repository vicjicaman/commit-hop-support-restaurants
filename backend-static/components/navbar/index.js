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

export default ({ lang }) => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Supporting restaurants</NavbarBrand>

      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href={`/${lang}`}>Map</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${lang}/search`}>Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/listing/${lang}`}>Listing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${lang}/admin`}>Admin</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/${lang}/donations`}>Donations</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
