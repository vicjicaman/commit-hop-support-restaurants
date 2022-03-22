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
import {
  Handler as FormHandler,
  validation as validationSchema,
} from "components///restaurant/form";
import { RESTAURANT_CREATE } from "../../../mutations/restaurant";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

export const Component = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const navegate = useNavigate();
  const params = useParams();

  const [mutate, mutationRes] = useMutation(RESTAURANT_CREATE, {
    onCompleted: () => {
      navegate(`/${params.lang}/admin`);
    },
  });

  if (mutationRes.loading) return <p>Submitting...</p>;
  if (mutationRes.error)
    return <p>Submission error! {mutationRes.error.message}</p>;

  return (
    <Container>
      <Row className="m-4">
        <Col>
          <Formik
            initialValues={{
              name: "",
              description: "",
              supportedEmployees: 1,
              preparedMeals: 100,
              receivedDonations: 0,
              images: [],
              latitude: 0.0,
              longitude: 0.0,
            }}
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
            {FormHandler}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
