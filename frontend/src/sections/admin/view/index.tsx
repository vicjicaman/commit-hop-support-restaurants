import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_GET } from "../../../queries/restaurant";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

export const Component = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(RESTAURANT_GET, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    viewer: {
      account: {
        restaurants: { get },
      },
    },
  } = data;

  const { id, images, name, description } = get;

  return (
    <Container>
      <Row key={id} className="m-4">
        <Col>
          <img className="w-50" src={images[0]} />
        </Col>
        <Col>
          <b>{name}</b>
          <p>{description}</p>
          <Link to={`/${params.lang}/admin/edit/${id}`}>Edit</Link>
        </Col>
      </Row>
    </Container>
  );
};
