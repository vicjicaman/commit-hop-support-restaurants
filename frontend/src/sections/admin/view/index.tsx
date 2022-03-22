import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_GET } from "queries/restaurant";
import RestaurantContent from "components/restaurant/content";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

import Remove from "./remove";

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
        restaurants: { get: restaurant },
      },
    },
  } = data;

  const { id, images, name, description } = restaurant;

  return (
    <Container>
      <Row key={id} className="m-4">
        <RestaurantContent restaurant={restaurant} />
        <Col>
          <Link to={`/${params.lang}/admin/edit/${id}`}>Edit</Link>
          <Remove restaurant={restaurant} />
        </Col>
      </Row>
    </Container>
  );
};
