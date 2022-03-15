import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_LIST } from "../../queries";
import { useQuery } from "@apollo/client";

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
      {list.map(({ id, name }: any) => (
        <Row key={id}>
          <Col>
            <p>{name}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
