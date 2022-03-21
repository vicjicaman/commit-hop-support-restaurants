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
import { Link, useParams } from "react-router-dom";
import L from "leaflet";

import { Component as SectionComponent } from "./sections";
import * as Lang from "./components/lang";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const params = useParams();
  const { lang } = params;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Supporting restaurants</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to={`/${lang}`}>
                Map
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={`/${lang}/search`}>
                Search
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={`/listing/${lang}`}>
                Listing
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={`/${lang}/admin`}>
                Admin
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to={`/${lang}/donations`}>
                Donations
              </Link>
            </NavItem>

            <Lang.Selector />
          </Nav>
        </Collapse>
      </Navbar>

      <SectionComponent />
    </>
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
