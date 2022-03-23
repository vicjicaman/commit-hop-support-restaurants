import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_GET } from "common/queries/restaurant";
import RestaurantContent from "common/restaurant/content";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import Remove from "./remove";

export const Component = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(RESTAURANT_GET, {
    variables: { id: params.id },
  });

  if (loading) return <p>...</p>;
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
          <Link
            className="btn btn-primary m-2  text-capitalize"
            to={`/${params.lang}/admin/edit/${id}`}
          >
            <FormattedMessage id="app.edit" />
          </Link>
          <Remove restaurant={restaurant} />
        </Col>
      </Row>
    </Container>
  );
};
