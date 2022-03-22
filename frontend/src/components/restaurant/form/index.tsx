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
        <Label for="name">Name</Label>
        <Field name="name" type="text" className="form-control" />
        <ErrorMessage
          name="name"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Field name="description" type="text" className="form-control" />
        <ErrorMessage
          name="description"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label for="preparedMeals">Prepared Meals</Label>
        <Field name="preparedMeals" type="number" className="form-control" />
        <ErrorMessage
          name="preparedMeals"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label for="supportedEmployees">Supported Employees</Label>
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
        <Label for="receivedDonations">Received Donations</Label>
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
        <Label for="latitude">Latitude</Label>
        <Field name="latitude" type="text" className="form-control" />
        <ErrorMessage
          name="latitude"
          className="d-block invalid-feedback"
          component="span"
        />
      </FormGroup>

      <FormGroup>
        <Label for="longitude">Longitude</Label>
        <Field name="longitude" type="text" className="form-control" />
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
                Add a Image
              </button>
            )}
          </Container>
        )}
      />

      <Button color="danger" type="submit" className="mr-4">
        Save
      </Button>

      <Button
        color="secondary"
        type="button"
        onClick={() => {
          values.id
            ? navegate(`/${params.lang}/admin/view/${values.id}`)
            : navegate(`/${params.lang}/admin`);
        }}
      >
        Cancel
      </Button>
    </Form>
  );
};
