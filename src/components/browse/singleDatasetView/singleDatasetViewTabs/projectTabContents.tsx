import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "react-bootstrap";
import { datasetEmbeddedModel } from "../../../../models/dataset";

interface ProjectTabContentsProps {
  details: datasetEmbeddedModel;
}

const ProjectTabContents = (props: ProjectTabContentsProps) => {
  return (
    <Tab.Pane eventKey="1">
      {props.details.has_study?.map((x) => {
        return x.has_project ? (
          <div key={x.id}>
            <h5 className="mb-4">
              <FontAwesomeIcon
                icon={faChartSimple}
                pull="left"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "rgba(214,95,48,0.2)",
                  padding: "4px",
                }}
                className="text-secondary me-3 fs-4 rounded"
                transform="rotate-180"
              />
              <strong>Project</strong>
            </h5>
            <p>
              <strong>ID: </strong>
              {x.has_project.accession !== null ? (
                x.has_project.accession
              ) : (
                <>N/A</>
              )}
            </p>
            <p>
              <strong>Title: </strong>
              {x.has_project.title}
            </p>
            <p>
              <strong>Attributes: </strong>
              {x.has_project.has_attribute !== null ? (
                <>
                  {x.has_project.has_attribute?.map((x) => {
                    return (
                      <p className="ms-3 mb-1">
                        <strong>{x.key}: </strong>
                        {x.value}
                      </p>
                    );
                  })}
                </>
              ) : (
                <>N/A</>
              )}
            </p>
            <p>
              <strong>Description: </strong>
              {x.has_project.description}
            </p>
          </div>
        ) : (
          <></>
        );
      })}
    </Tab.Pane>
  );
};

export default ProjectTabContents;
