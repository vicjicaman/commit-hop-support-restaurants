import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
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

  return (
    <Container>
      {list.map(({ id, name, images, description }: any) => (
        <Row key={id} className="m-4">
          <Col>
            <img className="w-50" src={images[0]} />
          </Col>
          <Col>
            <b>{name}</b>
            <p>{description}</p>
          </Col>
          <Col>
            <Link to={`/admin/view/${id}`}>View</Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
