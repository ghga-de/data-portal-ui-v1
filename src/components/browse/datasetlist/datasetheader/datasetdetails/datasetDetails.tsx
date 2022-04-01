import React, { useState } from "react";
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { datasetEmbeddedModel, hitModel, dataAccessCommitteeModel, dataAccessPolicyModel } from "../../../../../models/dataset";
import DatasetExperiments from "./datasetExperiments";
import DatasetFiles from "./datasetFiles";
import DatasetSamples from "./datasetSamples";
import DatasetStudies from "./datasetStudies";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faCircleExclamation,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

interface dataSetDetailsProps {
  hit: hitModel;
  details: datasetEmbeddedModel | null | undefined;
}

const DatasetDetails = (props: dataSetDetailsProps) => {
  const [show, setShow] = useState(false);
  const [copyEmail, setCopyEmail] = useState<string>('helpdesk@ghga.de')
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    setCopyEmail(getEmailId())
    setShow(true);
  }

  const requestAccess = (datasetId: string) => {
    const subject: string = "Request access for dataset " + datasetId;
    const body: string =
      `Dear  DAC team,%0D%0A%0D%0A` +
      `I am interested in accessing the Dataset%20` +
      `${props.hit.content.accession}, which is listed in the GHGA%20` +
      `Metadata Catalogue. %0D%0A` +
      `Please could you reply to me as soon as you%20` +
      `are able to discuss my proposed project? Thank you.%0D%0A%0D%0A%0D%0A` +
      `Kind regards`;
    window.location.assign(`mailto:${getEmailId()}?subject=${subject}&body=${body}`);
  };

  const getEmailId = () => {
    let mailId: string = "helpdesk@ghga.de";
    if (props.details !== null && props.details !== undefined) {
      const dataAccessPolicy: dataAccessPolicyModel = props.details.has_data_access_policy
      const dataAccessCommittee: dataAccessCommitteeModel = dataAccessPolicy.has_data_access_committee
      const main_contact = dataAccessCommittee.main_contact;
      for (var item of dataAccessCommittee.has_member) {
        if (main_contact === null) {
          mailId = (item.email === null || item.email === undefined) ? mailId : item.email
        }
        if (item.id === main_contact && item.email !== null && item.email !== undefined) {
          mailId = item.email
        }
      }
    }
    return mailId
  }

  return (
    <div className="fs-9">
      <Row>
        <Row className="pe-0">
          <Col className="pe-3">
            <p className="mb-1">
              <span className="fw-bold">Dataset ID:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                {props.hit.content.accession}
              </span>
            </p>
            <p>
              <span className="fw-bold">Full title:&nbsp;</span>
              <span style={{ userSelect: "all" }}>
                {props.hit.content.title}
              </span>
            </p>
          </Col>
          <Col lg={1} md={1} sm={1} xl={1} xs={1} xxl={1} className="text-end px-0">
            {props.details !== null && props.details !== undefined ? (
              <Button className="fs-8 w-100" onClick={() => handleOpen()}>
                Request Access
              </Button>
            ) : (
              <Button className="fs-8 w-100" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
          </Col>
          <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton className="border-0">
              <Modal.Title>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-muted me-3"
                />
                <strong>
                  How to request access for dataset{" "}
                  {props.hit.content.accession}
                </strong>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4">
              <Row className="mb-3 p-3 bg-gray align-items-center">
                <Col lg={1} md={1} sm={1} xl={1} xs={1} xxl={1}>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-danger"
                    size="2x"
                  />
                </Col>
                <Col>
                  To request access, you will need to contact to Data Access
                  Committee (DAC) who are responsible for approving applications
                  for this dataset. Please copy the message below and send it
                  via email to <strong>{getEmailId()}</strong>. If configured, you can click on ‘Open
                  Mail Client’ to open the message in your preferred email
                  client. Please add any additional details if necessary.
                  <br />
                  GHGA does not receive a copy of your email or any other
                  personal data from you if you open this message in your email
                  client. GHGA has no role in approving or rejecting data access
                  requests.
                </Col>
              </Row>
              <Row>
                <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                  To: {getEmailId()}
                </Col>
                <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>
                  <CopyToClipboard text={copyEmail}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-muted me-3"
                    />
                  </CopyToClipboard>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                  Subject: Request access for dataset {props.hit.content.accession}
                </Col>
                <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>
                  <CopyToClipboard text={"Request access for dataset " + props.hit.content.accession}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-muted me-3"
                    />
                  </CopyToClipboard>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col lg={10} md={10} sm={10} xl={10} xs={10} xxl={10}>
                  Dear DAC team,
                  <br />
                  <br />I am interested in accessing the Dataset{" "}
                  {props.hit.content.accession}, which is listed in the GHGA
                  Metadata Catalogue. Please could you reply to me as soon as you
                  are able to discuss my proposed project? Thank you.
                  <br />
                  <br />
                  Kind regards
                </Col>
                <Col lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>
                  <CopyToClipboard text={`Dear DAC team,
                    
                    I am interested in accessing the Dataset ` +
                    props.hit.content.accession + `, which is listed in the GHGA
                    Metadata Catalogue. Please could you reply to me as soon as you
                    are able to discuss my proposed project? Thank you.
                    
                    Kind regards`}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-muted me-3"
                    />
                  </CopyToClipboard>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Col className="px-4">
                <Button
                  variant="outline-dark"
                  onClick={handleClose}
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="pe-4">
                <Button
                  className="w-100"
                  onClick={() => requestAccess(props.hit.content.accession)}
                >
                  Open Mail Client
                </Button>
              </Col>
            </Modal.Footer>
          </Modal>
        </Row>
        <p className="fs-8">
          <span className="fw-bold">Description:&nbsp;</span>
          {props.hit.content.description}
        </p>
      </Row>
      <hr />
      {props.details !== null && props.details !== undefined ? (
        <div>
          <Row className="my-4 pt-3 fs-8">
            <DatasetStudies studiesList={props.details.has_study} />
            <DatasetFiles filesList={props.details.has_file} />
          </Row>
          <Row className="pb-4 pt-2 fs-8">
            <DatasetSamples samplesList={props.details.has_sample} />
            <DatasetExperiments
              experimentsList={props.details.has_experiment}
              hit={props.hit}
            />
          </Row>
        </div>
      ) : (
        <div>
          <Spinner animation="border" variant="primary" size="sm" />
          &nbsp;Dataset details loading, please wait...
        </div>
      )}
    </div>
  );
};

export default DatasetDetails;
