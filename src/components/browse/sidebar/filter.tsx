import React, { Dispatch, SetStateAction } from "react";
import { Form, Col, Container, Row } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";

interface filterProps {
  facet: facetModel;
  check: Map<string, boolean>;
  setCheck: Dispatch<SetStateAction<Map<string, boolean>>>;
  searchKeyword: string;
  appliedFilterDict: facetFilterModel[];
  setAppliedFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
}

const Filter = (props: filterProps) => {
  const handleCheck = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facetFilter: facetFilterModel = {
      key: key.split(":")[0],
      value: key.split(":")[1],
    };
    if (event.target.checked) {
      props.setAppliedFilterDict(props.appliedFilterDict.concat(facetFilter));
    } else {
      props.setAppliedFilterDict(
        props.appliedFilterDict.filter((item) => item.value !== key.split(":")[1])
      );
    }
    props.setCheck(props.check.set(key, event.target.checked));
  };

  return (
    <Container className="bg-white border col-11 mb-3 pb-3 rounded fs-7 mx-0 w-100 px-2">
      <Form>
        <Form.Label className="mt-2">{props.facet.name}</Form.Label>
        <hr className="m-0" />
        {props.facet.options
          .sort((a, b) => (b.option < a.option ? 1 : -1))
          .map((option) => {
            let key: string = props.facet.key + ":" + option.option;
            return (
              <div className="p-1 d-flex align-top" key={key}>
                <Form.Check
                  id={key}
                  className="d-inline-block"
                  checked={props.check.get(key)}
                  value={key}
                  onChange={(event) => handleCheck(key, event)}
                  style={{ zIndex: 100 }}
                />
                <Form.Label className="p-0 m-0 w-100" htmlFor={key}>
                  <Row>
                    <Col lg md sm xl xs xxl={10}>
                      <p className="ps-2 my-0">{option.option}</p>
                    </Col>
                    <Col lg md sm xl xs xxl={2} className="h-100">
                      <Form.Label className="p-0 m-0" htmlFor={key}>
                        {option.count}
                      </Form.Label>
                    </Col>
                  </Row>
                </Form.Label>
              </div>
            );
          })}
      </Form>
    </Container>
  );
};

export default Filter;
