import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { RESTAURANT_SEARCH } from "common/queries/restaurant";
import RestaurantContent from "common/restaurant/content";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const Component = () => {
  const params = useParams();
  const [value, setValue] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(1);

  const { loading, error, data, refetch } = useQuery(RESTAURANT_SEARCH, {
    variables: { term },
  });

  useEffect(() => {
    refetch();
  }, [trigger]);

  if (loading) return <p>...</p>;
  if (error) return <p>Error :(</p>;

  const {
    viewer: {
      account: {
        restaurants: { search: list },
      },
    },
  } = data;

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setTerm(value);
                setTrigger(trigger + 1);
              }}
            >
              <FormGroup>
                <Label for="searchTerm" hidden className="text-capitalize">
                  <FormattedMessage id="app.search" />
                </Label>
                <Input
                  autoFocus
                  type="search"
                  name="search"
                  id="searchTerm"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </FormGroup>{" "}
              <Button>
                <span className="text-capitalize">
                  <FormattedMessage id="app.search" />
                </span>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        {list.length ? (
          list.map((restaurant: any) => {
            const { id, name, images, description } = restaurant;
            return (
              <Row key={id} className="m-4">
                <RestaurantContent restaurant={restaurant} />
                <Col>
                  <a
                    className="btn btn-primary text-capitalize"
                    href={`/listing/${params.lang}/view/${id}`}
                  >
                    <FormattedMessage id="app.view" />
                  </a>
                </Col>
              </Row>
            );
          })
        ) : (
          <div className="text-center text-capitalize">
            <FormattedMessage id="app.no-results" />
          </div>
        )}
      </Container>
    </>
  );
};
