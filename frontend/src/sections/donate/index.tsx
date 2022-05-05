import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FormattedMessage } from "react-intl";

export const Component = () => {
  return (
    <Container>
      <Row>
        <Col>
          <p>
            <FormattedMessage id="msg.intro" />{" "}
            <b>
              <a href="https://wck.org/" target="_blank">
                World Central Kitchen
              </a>
            </b>
          </p>
          <p>
            <FormattedMessage id="msg.goal" />
          </p>
          <p>
            <FormattedMessage id="msg.cta" />
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            className="text-capitalize"
            color="success"
            onClick={() => {
              window.open(
                `https://donate.wck.org/give/f3789323/#!/donation/checkout`,
                "_blank"
              );
            }}
          >
            <FormattedMessage id="app.donate" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
/*
const {
  viewer: {
    account: {
      restaurants: { find },
    },
  },
} = data;
*/
