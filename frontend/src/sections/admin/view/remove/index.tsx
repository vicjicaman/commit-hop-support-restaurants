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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";

import { RESTAURANT_REMOVE } from "../../../../mutations/restaurant";
import { useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";

export default ({ restaurant }: any) => {
  const { id, name, description } = restaurant;
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const navegate = useNavigate();
  const params = useParams();

  const [mutate, mutationRes] = useMutation(RESTAURANT_REMOVE, {
    onCompleted: () => {
      navegate(`/${params.lang}/admin`);
    },
  });

  if (mutationRes.loading) return <p>...</p>;
  if (mutationRes.error) return <p>Error {mutationRes.error.message}</p>;

  /*

  */

  const toggle = () => setOpen(!open);
  return (
    <>
      <Button color="danger" className="m-2 text-capitalize" onClick={toggle}>
        <FormattedMessage id="app.remove" />
      </Button>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-capitalize">
          <FormattedMessage id="app.remove" />
        </ModalHeader>
        <ModalBody>
          <FormattedMessage id="app.confirm-remove" />:{" "}
          <div>
            <b>{name}</b> - {description}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className={"text-capitalize"}
            color="danger"
            onClick={() => {
              mutate({
                variables: {
                  id,
                },
              });
            }}
          >
            <FormattedMessage id="app.remove" />
          </Button>{" "}
          <Button
            className={"text-capitalize"}
            color="secondary"
            onClick={toggle}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
