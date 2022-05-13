import React from "react";
import { flagStyle } from "common/lang";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { FormattedMessage } from "react-intl";
import * as Lang from "common/lang";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

const NavItemCommon = ({ icon, lang, id, tag, href: target, pathname, exact }) => {
  //const target = `/${lang}${href}`;
  const active =
    exact === true ? pathname === target : pathname.startsWith(target);

  return tag ? (
    <NavLink className="text-capitalize" tag={tag} to={target} active={active}>
      <FontAwesomeIcon icon={icon} /> {" "}
      <FormattedMessage id={id} />
    </NavLink>
  ) : (
    <NavLink className="text-capitalize" href={target} active={active}>
      <FontAwesomeIcon icon={icon} /> {" "}
      <FormattedMessage id={id} />
    </NavLink>
  );
};

export default ({ lang, tag, pathname }) => {
  const props = { lang, tag, pathname };
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand className="text-capitalize" href={`/${lang}`}>
        <img style={flagStyle} src={`/flags/ua.png`} />{" "}<FormattedMessage id="app.title" />
      </NavbarBrand>

      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavItemCommon
              {...props}
              icon={faMapMarkerAlt}
              id={"app.map"}
              href={`/${lang}/map`}
              exact={true}
            />
          </NavItem>
          <NavItem>
            <NavItemCommon
              {...props}
              icon={faGithub}
              id={"app.opensource"}
              href={`/${lang}/opensource`}
              exact={true}
            />
          </NavItem>
          <NavItem>
            <NavItemCommon
              {...props}
              icon={faStar}
              id={"app.projects"}
              href={`/${lang}/projects`}
              exact={true}
            />
          </NavItem>
          <NavItem>
            <NavItemCommon
              {...props}
              icon={faHeart}
              id={"app.donate"}
              href={`/${lang}/donate`}
              exact={true}
            />
          </NavItem>
          <Lang.Selector lang={lang} />
        </Nav>
      </Collapse>
    </Navbar>
  );
};
