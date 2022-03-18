import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { RESTAURANT_SEARCH } from "../../queries";
import { useQuery } from "@apollo/client";

export const Component = () => {
  const [value, setValue] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(1);

  const { loading, error, data, refetch } = useQuery(RESTAURANT_SEARCH, {
    variables: { term },
  });

  useEffect(() => {
    refetch();
  }, [trigger]);

  if (loading) return <p>Loading...</p>;
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
                <Label for="searchTerm" hidden>
                  Search
                </Label>
                <Input
                  autoFocus
                  type="search"
                  name="Search"
                  id="searchTerm"
                  placeholder="Search"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </FormGroup>{" "}
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        {list.length ? (
          list.map(({ id, name, images, description }: any) => (
            <Row key={id} className="m-4">
              <Col>
                <img className="w-50" src={images[0]} />
              </Col>
              <Col>
                <b>{name}</b>
                <p>{description}</p>
              </Col>
            </Row>
          ))
        ) : (
          <div className="text-center">No results </div>
        )}
      </Container>
    </>
  );
};
