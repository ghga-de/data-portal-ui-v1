import {
  faBookOpen,
  faBook,
  faChartSimple,
  faUsersRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";
import DapTabContents from "./dapTabContents";
import ProjectTabContents from "./projectTabContents";
import PublicationTabContents from "./publicationTabContents";
import StudyTabContents from "./studyTabContents";

interface SingleDatasetViewTabsProps {
  details: datasetEmbeddedModel;
}

const SingleDatasetViewTabs = (props: SingleDatasetViewTabsProps) => {
  return (
    <Container className="mb-5">
      <Tab.Container defaultActiveKey="0">
        <Nav variant="pills" className="justify-content-center mb-2">
          <Nav.Item>
            <Nav.Link
              eventKey="0"
              className="border border-1 mx-2 border-light text-center"
              style={{width: "140px", borderRadius:"10px"}}
            >
              <FontAwesomeIcon
                icon={faBook}
                className="text-secondary me-2"
              />
              Study
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="1"
              className="border border-1 mx-2 border-light text-center"
              style={{width: "140px", borderRadius:"10px"}}
            >
              <FontAwesomeIcon
                icon={faChartSimple}
                className="text-secondary me-2"
                transform="rotate-180"
              />
              Project
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="2"
              className="border border-1 mx-2 border-light text-center"
              style={{width: "140px", borderRadius:"10px"}}
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-secondary me-2"
              />
              Publication
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="3"
              className="border border-1 mx-2 border-light text-center"
              style={{width: "140px", borderRadius:"10px"}}
            >
              <FontAwesomeIcon
                icon={faUsersRays}
                className="text-secondary me-2"
                transform="grow-4"
              />
              DAP/DAC
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Container className="mb-5 border border-1 p-3 shadow-sm" style={{borderRadius: "20px"}}>
          <Tab.Content className="mb-4" style={{height: "350px"}}>
            <StudyTabContents details={props.details} />
            <ProjectTabContents details={props.details} />
            <PublicationTabContents details={props.details} />
            <DapTabContents details={props.details} />
          </Tab.Content>
        </Container>
      </Tab.Container>
    </Container>
  );
};

export default SingleDatasetViewTabs;
