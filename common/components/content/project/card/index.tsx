import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCoffee, faExternalLink } from "@fortawesome/free-solid-svg-icons";

export default ({ project }: any) => {
  const {
    name,
    description,
    logo,
    webpage
  } = project;

  return (
    <>
      <Col md={2}>
        <img className="w-100" src={logo} />
      </Col>
      <Col md={8}>
        <b>{name}</b> <a href={webpage} target="_blank" ><FontAwesomeIcon icon={faExternalLink} /></a>
        <p>{description}</p>

      </Col>
    </>
  );
};
