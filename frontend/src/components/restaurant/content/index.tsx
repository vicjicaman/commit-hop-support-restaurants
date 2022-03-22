import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";

export default ({ restaurant }: any) => {
  const { name, description, images, receivedDonations } = restaurant;

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
          <Badge color="primary" pill>
            {money.format(receivedDonations)}
          </Badge>
        </div>
      </Col>
    </>
  );
};
