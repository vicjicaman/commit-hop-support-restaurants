import React, { useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { RESTAURANT_LIST } from "common/queries/restaurant";
import RestaurantContent from "common/restaurant/content";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

export const Component = () => {
  const params = useParams();
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
      <Row>
        <Col>
          {" "}
          <Link
            className="btn  btn-primary"
            to={`/${params.lang}/admin/create`}
          >
            Create
          </Link>
        </Col>
      </Row>
      {list.map((restaurant: any) => {
        const { id, name, images, description, receivedDonations } = restaurant;
        return (
          <Row key={id} className="m-4">
            <RestaurantContent restaurant={restaurant} />
            <Col>
              <Link
                className="btn btn-primary"
                to={`/${params.lang}/admin/view/${id}`}
              >
                Admin
              </Link>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
