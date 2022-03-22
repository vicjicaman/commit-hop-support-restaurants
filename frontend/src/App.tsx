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
import { Link, useParams, Navigate } from "react-router-dom";
import L from "leaflet";

import { Component as SectionComponent } from "./sections";
import * as Lang from "./components/lang";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { IntlProvider, FormattedMessage } from "react-intl";
import French from "./lang/fr.json";
import Polish from "./lang/pl.json";
import English from "./lang/en.json";
import Ukranian from "./lang/ua.json";
import Romanian from "./lang/ro.json";

const messages = {
  fr: French,
  en: English,
  pl: Polish,
  ua: Ukranian,
  ro: Romanian,
};

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
  const current = lang as string;

  return (
    <IntlProvider
      locale={current}
      messages={messages[current as keyof typeof messages]}
    >
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <FormattedMessage id="app.title" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={Link}
                to={`/${lang}`}
                active={window.location.pathname === `/${lang}`}
              >
                  <FormattedMessage id="app.map" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to={`/${lang}/search`}
                active={window.location.pathname.startsWith(`/${lang}/search`)}
              >
                  <FormattedMessage id="app.search" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`/listing/${lang}`}>  <FormattedMessage id="app.listing" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to={`/${lang}/admin`}
                active={window.location.pathname.startsWith(`/${lang}/admin`)}
              >
                  <FormattedMessage id="app.admin" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to={`/${lang}/donate`}
                active={window.location.pathname.startsWith(`/${lang}/donate`)}
              >
                  <FormattedMessage id="app.donate" />
              </NavLink>
            </NavItem>

            <Lang.Selector />
          </Nav>
        </Collapse>
      </Navbar>

      <SectionComponent />
    </IntlProvider>
  );
}

export default App;
