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
import { RESTAURANT_GET } from "common/queries/restaurant";
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

  if (queryRes.loading) return <p>...</p>;
  if (queryRes.error) return <p>Error :(</p>;

  if (mutationRes.loading) return <p>...</p>;
  if (mutationRes.error)
    return <p>Error: {mutationRes.error.message}</p>;

  const {
    viewer: {
      account: {
        restaurants: { get },
      },
    },
  } = queryRes.data;

  const { id, images, name, description } = get;

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
            {FormHandler}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
