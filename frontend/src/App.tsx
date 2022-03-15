import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
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
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import L from "leaflet";

import { Component as SectionComponent } from "./sections";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/">
                Map
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/listing">
                Listing
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>

      <SectionComponent />
    </div>
  );
}

export default App;

/*
<UncontrolledDropdown nav inNavbar>
  <DropdownToggle nav caret>
    Options
  </DropdownToggle>
  <DropdownMenu right>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem divider />
    <DropdownItem>Reset</DropdownItem>
  </DropdownMenu>
</UncontrolledDropdown>
*/
