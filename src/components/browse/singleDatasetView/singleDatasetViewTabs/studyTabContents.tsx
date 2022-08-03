import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";

interface StudyTabContentsProps {
  details: datasetEmbeddedModel;
}

const StudyTabContents = (props: StudyTabContentsProps) => {
  return (
    <Tab.Pane eventKey="0">
      {props.details.has_study.map((x) => {
        return (
          <div key={x.id}>
            <h5 className="mb-4">
              <FontAwesomeIcon
                icon={faChartPie}
                pull="left"
                className="text-secondary me-3 fs-4"
              />
              <strong>Study</strong>
            </h5>
            <p className="mb-4">
              <strong>Title: </strong>
              {x.title}
            </p>
            <p className="mb-4">
              <strong>Type: </strong>
              <span className="text-capitalize">{x.type}</span>
            </p>
            <p className="fs-7">
              <strong>Description: </strong>
              {props.details.description}
            </p>
          </div>
        );
      })}
    </Tab.Pane>
  );
};

export default StudyTabContents;
