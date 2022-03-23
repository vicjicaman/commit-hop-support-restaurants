import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { RESTAURANT_LIST } from "common/queries/restaurant";
import RestaurantContent from "common/restaurant/content";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const Component = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(RESTAURANT_LIST);

  if (loading) return <p>...</p>;
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
      <Row>
        <Col>
          {" "}
          <Link
            className="btn  btn-primary  text-capitalize"
            to={`/${params.lang}/admin/create`}
          >
            <FormattedMessage id="app.new" />
          </Link>
        </Col>
      </Row>
      {list.map((restaurant: any) => {
        const { id, name, images, description, receivedDonations } = restaurant;
        return (
          <Row key={id} className="m-4">
            <RestaurantContent restaurant={restaurant} />
            <Col className="col-md-2">
              <Link
                className="btn btn-primary text-capitalize"
                to={`/${params.lang}/admin/view/${id}`}
              >
                <FormattedMessage id="app.admin" />
              </Link>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
