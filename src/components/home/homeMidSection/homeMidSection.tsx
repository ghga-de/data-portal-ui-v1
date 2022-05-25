import { Row, Col, Carousel, Button, Spinner } from "react-bootstrap";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import projects from "./projects.json";
import bundeslaender from "../../../assets/homepage/Bundeslaender.svg";

const HomeMidSection = () => {
  return (
    <Row className="w-100 m-0 mb-3">
      <Col className="col-8 bg-primary rounded p-3 text-white" style={{
      backgroundImage: `url(${bundeslaender})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "400px",
      backgroundPosition: "left 50px top -260px",
    }}>
        <h4 className="mb-4">Our Projects</h4>
        <Carousel indicators={false}>
          {projects.map((x, idx) => (
            <Carousel.Item key={"homepage_projects_" + idx}>
              <div className="px-5">
                <h5>{x.name}</h5>
                <Row>
                  <Col className="col-7">
                    <p>{x.description}</p>
                  </Col>
                  <Col>
                    <img src={x.chart_location} alt={x.chart_alt} />
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    variant="white"
                    className="shadow-sm text-secondary"
                    href={x.learn_more_href}
                  >
                    Learn more...
                  </Button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col className="rounded">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="GHGA_DE"
          noFooter
          options={{ height: 425 }}
          placeholder={
            <>
              <Spinner animation="border" size="sm" variant="info" />
              &nbsp;Loading{" "}
              <a href="https://twitter.com/GHGA_DE">
                GHGA Twitter timeline
              </a>{" "}
              ...
              <br />
              You may need to disable blocking of third-party cookies for this
              element to display correctly.
            </>
          }
        />
      </Col>
    </Row>
  );
};

export default HomeMidSection;
