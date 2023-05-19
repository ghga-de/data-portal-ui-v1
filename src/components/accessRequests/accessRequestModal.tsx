// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Button, Col, Modal, Row } from "react-bootstrap";
import { fetchJson } from "../../utils/utils";
import { showMessage } from "../messages/usage";

const API_URL = process.env.REACT_APP_SVC_API_URL;

interface AccessRequestModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: any;
  handleShow: any;
  id: string;
  requester: string;
  email: string;
  text: string;
  requested: string;
  accessStart: string;
  accessEnd: string;
  status: string;
  disabledButtons: boolean;
  setDisabledButtons: any;
  setAccessRequests: any;
  setNeedsUpdate: any;
}

const COL_CLASSES = "col-xs-5 col-md-4";
const ROW_CLASSES = "mb-3";

//
const AccessRequestModal = (props: AccessRequestModalProps) => {
  async function handleAllowAccess() {
    props.setDisabledButtons(true);
    const url = `${API_URL}/access-requests/${props.id}`;
    try {
      const response = await fetchJson(url, "PATCH", { status: "allowed" });
      if (response.status === 200) {
        response.json().then((x) => {
          props.setAccessRequests(x);
        });
        props.setNeedsUpdate(true);
        showMessage({
          type: "success",
          title: "Access request has been accepted!",
        });
      }
    } catch (error) {
      props.setDisabledButtons(false);
      showMessage({
        type: "error",
        title: "Could not change status of request.",
      });
    }
  }

  async function handleDenyAccess() {
    props.setDisabledButtons(true);
    const url = `${API_URL}/access-requests/${props.id}`;
    try {
      const response = await fetchJson(url, "PATCH", { status: "denied" });
      if (response.status === 200) {
        response.json().then((x) => {
          props.setAccessRequests(x);
        });
        props.setNeedsUpdate(true);
        showMessage({
          type: "success",
          title: "Access request successfully updated!",
        });
      }
    } catch (error) {
      props.setDisabledButtons(false);
      showMessage({
        type: "error",
        title: "Could not change status of request.",
      });
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Access Request {props.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className={ROW_CLASSES}>
          <Col className={COL_CLASSES}>Requester:</Col>
          <Col>{props.requester}</Col>
        </Row>
        <Row className={ROW_CLASSES}>
          <Col className={COL_CLASSES}>Contact e-Mail:</Col>
          <Col>{props.email}</Col>
        </Row>
        <Row className={ROW_CLASSES}>
          <Col className={COL_CLASSES}>Request Text:</Col>
          <Col>{props.text}</Col>
        </Row>
        <Row className={ROW_CLASSES}>
          <Col>Request has been made on {props.requested.split("T")[0]}</Col>
        </Row>
        <Row className={ROW_CLASSES}>
          <Col>
            Access has been requested from {props.accessStart.split("T")[0]}
            &nbsp;until {props.accessEnd.split("T")[0]}{" "}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="justify-content-start">
        <Button
          variant="secondary"
          className="text-white me-3"
          onClick={() => handleDenyAccess()}
          disabled={
            props.status === "allowed" ||
            props.status === "denied" ||
            props.disabledButtons
          }
        >
          Deny
        </Button>
        <Button
          variant="quaternary"
          onClick={() => handleAllowAccess()}
          disabled={
            props.status === "allowed" ||
            props.status === "denied" ||
            props.disabledButtons
          }
        >
          Allow
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccessRequestModal;
