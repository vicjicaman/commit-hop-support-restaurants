import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useQuery } from "@apollo/client";
import { Link, useParams, Navigate } from "react-router-dom";
import L from "leaflet";

import { Component as SectionComponent } from "./sections";
import * as Lang from "common/lang";
import PageHandler from "common/page";
import Navbar from "common/navbar";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { FormattedMessage } from "react-intl";

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
    <PageHandler lang={current}>
      <Navbar lang={lang} tag={Link} />
      <SectionComponent />
    </PageHandler>
  );
}

export default App;
