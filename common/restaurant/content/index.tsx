import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default ({ restaurant }: any) => {
  const {
    name,
    description,
    images,
    receivedDonations,
    preparedMeals,
    supportedEmployees,
  } = restaurant;

  const money = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      <Col sm={2}>
        <img className="w-100" src={images[0]} />
      </Col>
      <Col sm={8}>
        <b>{name}</b>
        <p>{description}</p>
        <div>
          <Badge color="primary" className="mr-2" pill>
            {money.format(receivedDonations)}
          </Badge>

          <Badge color="secondary" className="mr-2" pill>
            <FontAwesomeIcon icon={faCoffee} /> {preparedMeals}
          </Badge>

          <Badge color="secondary" className="mr-2" pill>
            <FontAwesomeIcon icon={faUser} /> {supportedEmployees}
          </Badge>
        </div>
      </Col>
    </>
  );
};
