import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_SEARCH } from "../../queries";
import { useQuery } from "@apollo/client";

export const Component = () => {
  const { loading, error, data } = useQuery(RESTAURANT_SEARCH, {
    variables: { term: "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    viewer: {
      account: {
        restaurants: { search },
      },
    },
  } = data;

  return <Container></Container>;
};
