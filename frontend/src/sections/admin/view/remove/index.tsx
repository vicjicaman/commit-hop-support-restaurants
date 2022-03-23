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

  if (mutationRes.loading) return <p>Submitting...</p>;
  if (mutationRes.error)
    return <p>Submission error! {mutationRes.error.message}</p>;

  /*

  */

  const toggle = () => setOpen(!open);
  return (
    <>
      <Button color="danger" className="m-2" onClick={toggle}>
        Remove
      </Button>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Remove restaurant</ModalHeader>
        <ModalBody>
          Do you really want to remove the restaurant entry:{" "}
          <div>
            <b>{name}</b> - {description}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              mutate({
                variables: {
                  id,
                },
              });
            }}
          >
            Remove
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
