import React from "react";

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

const NavItemCommon = ({ lang, id, tag, href: target, pathname, exact }) => {
  //const target = `/${lang}${href}`;
  const active = 
    exact === true ? pathname === target : pathname.startsWith(target);

  return tag ? (
    <NavLink className="text-capitalize" tag={tag} to={target} active={active}>
      <FormattedMessage id={id} />
    </NavLink>
  ) : (
    <NavLink className="text-capitalize" href={target} active={active}>
      <FormattedMessage id={id} />
    </NavLink>
  );
};

export default ({ lang, tag, pathname }) => {
  const props = { lang, tag, pathname };
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand className="text-capitalize" href={`/${lang}`}>
        <FormattedMessage id="app.title" />
      </NavbarBrand>

      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavItemCommon
              {...props}
              id={"app.border-point"}
              href={`/${lang}/border-point`}
              exact={true}
            />
          </NavItem>
          <NavItem>
            <NavItemCommon
              {...props}
              id={"app.restaurant"}
              href={`/${lang}/restaurant`}
              exact={true}
            />
          </NavItem>
          <NavItem>
            <NavItemCommon
              {...props}
              id={"app.donate"}
              href={`/${lang}/donate`}
            />
          </NavItem>
          <Lang.Selector lang={lang} />
        </Nav>
      </Collapse>
    </Navbar>
  );
};
