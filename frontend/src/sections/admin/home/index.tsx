import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { RESTAURANT_LIST } from "../../../queries/restaurant";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export const Component = () => {
  const { loading, error, data } = useQuery(RESTAURANT_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    viewer: {
      account: {
        restaurants: { list },
      },
    },
  } = data;

  const money = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Container>
      {list.map(({ id, name, images, description, receivedDonations }: any) => (
        <Row key={id} className="m-4">
          <Col>
            <img className="w-50" src={images[0]} />
          </Col>
          <Col>
            <b>{name}</b>
            <p>{description}</p>
            <div>
              <Badge color="primary" pill>
                {money.format(receivedDonations)}
              </Badge>
            </div>
          </Col>
          <Col>
            <Link to={`/admin/view/${id}`}>Admin</Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
