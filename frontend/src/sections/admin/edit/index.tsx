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
import { RESTAURANT_GET } from "../../../queries/restaurant";
import { RESTAURANT_EDIT } from "../../../mutations/restaurant";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

export const Component = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const navegate = useNavigate();
  const params = useParams();
  const queryRes = useQuery(RESTAURANT_GET, {
    variables: { id: params.id },
  });
  const [mutate, mutationRes] = useMutation(RESTAURANT_EDIT, {
    onCompleted: () => {
      navegate(`/${params.lang}/admin/view/${id}`);
    },
  });

  if (queryRes.loading) return <p>Loading...</p>;
  if (queryRes.error) return <p>Error :(</p>;

  if (mutationRes.loading) return <p>Submitting...</p>;
  if (mutationRes.error)
    return <p>Submission error! {mutationRes.error.message}</p>;

  const {
    viewer: {
      account: {
        restaurants: { get },
      },
    },
  } = queryRes.data;

  const { id, images, name, description } = get;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  return (
    <Container>
      <Row key={id} className="m-4">
        <Col>
          <Formik
            initialValues={get}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              //console.log(values);
              const {
                name,
                description,
                supportedEmployees,
                preparedMeals,
                receivedDonations,
                images,
                latitude,
                longitude,
              } = values;
              mutate({
                variables: {
                  id,
                  input: {
                    name,
                    description,
                    supportedEmployees,
                    preparedMeals,
                    receivedDonations,
                    images,
                    latitude,
                    longitude,
                  },
                },
              });
              setSubmitting(false);
            }}
          >
            {({ values }) => (
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
                  <Field
                    name="description"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="preparedMeals">Prepared Meals</Label>
                  <Field
                    name="preparedMeals"
                    type="number"
                    className="form-control"
                  />
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
                  <Field
                    name="longitude"
                    type="text"
                    className="form-control"
                  />
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
                              <img
                                className="w-25"
                                src={values.images[index]}
                              />
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
                                onClick={() =>
                                  arrayHelpers.insert(index + 1, "")
                                } // insert an empty string at a position
                              >
                                +
                              </button>
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          {/* show this when user has removed all images from the list */}
                          Add a Image
                        </button>
                      )}
                    </Container>
                  )}
                />

                <Button color="danger" type="submit" className="mr-4">
                  Edit
                </Button>

                <Button
                  color="secondary"
                  type="button"
                  onClick={() => {
                    navegate(`/${params.lang}/admin/view/${id}`);
                  }}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
