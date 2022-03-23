import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { FormattedMessage } from "react-intl";

export const validation = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

export const Handler = ({ values }: any) => {
  const params = useParams();
  const navegate = useNavigate();

  return (
    <Form>
      <FormGroup>
        <Label className="text-capitalize" for="name">
          <FormattedMessage id="app.name" />
        </Label>
        <Field name="name" type="text" className="form-control" />
        <ErrorMessage
          name="name"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="description">
          <FormattedMessage id="app.description" />
        </Label>
        <Field name="description" type="text" className="form-control" />
        <ErrorMessage
          name="description"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="preparedMeals">
          <FormattedMessage id="app.prepared-meals" />
        </Label>
        <Field name="preparedMeals" type="number" className="form-control" />
        <ErrorMessage
          name="preparedMeals"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="supportedEmployees">
          <FormattedMessage id="app.supported-employees" />
        </Label>
        <Field
          name="supportedEmployees"
          type="number"
          className="form-control"
        />
        <ErrorMessage
          name="supportedEmployees"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="receivedDonations">
          <FormattedMessage id="app.received-donations" />
        </Label>
        <Field
          name="receivedDonations"
          type="number"
          className="form-control"
        />
        <ErrorMessage
          name="receivedDonations"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="latitude">
          <FormattedMessage id="app.latitude" />
        </Label>
        <Field name="latitude" type="number" className="form-control" />
        <ErrorMessage
          name="latitude"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label className="text-capitalize" for="longitude">
          <FormattedMessage id="app.longitude" />
        </Label>
        <Field name="longitude" type="number" className="form-control" />
        <ErrorMessage
          name="longitude"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FieldArray
        name="images"
        render={(arrayHelpers) => (
          <Container>
            {values.images && values.images.length > 0 ? (
              values.images.map((image: string, index: number) => (
                <Row key={index} className="m-4">
                  <Col>
                    <img className="w-25" src={values.images[index]} />
                  </Col>
                  <Col>
                    <Field name={`images.${index}`} />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a image from the list
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.insert(index + 1, "")} // insert an empty string at a position
                    >
                      +
                    </button>
                  </Col>
                </Row>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                {/* show this when user has removed all images from the list */}
                <FormattedMessage id="app.add-image" /> Add a Image
              </button>
            )}
          </Container>
        )}
      />

      <Button color="danger" type="submit" className="mr-4 text-capitalize">
        <FormattedMessage id="app.save" />
      </Button>

      <Button
        color="secondary"
        type="button"
        className="text-capitalize"
        onClick={() => {
          values.id
            ? navegate(`/${params.lang}/admin/view/${values.id}`)
            : navegate(`/${params.lang}/admin`);
        }}
      >
        <FormattedMessage id="app.cancel" />
      </Button>
    </Form>
  );
};
