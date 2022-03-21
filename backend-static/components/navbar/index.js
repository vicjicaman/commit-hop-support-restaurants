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

export default () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Supporting restaurants</NavbarBrand>

      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/">Map</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/search">Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/listing">Listing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/admin">Admin</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/donations">Donations</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
