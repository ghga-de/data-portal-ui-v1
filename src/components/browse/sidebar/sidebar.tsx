import React, { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchbar";
import Filter from "./filter";
import { Row, Col, Button } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from 'react-router-dom'
import { scrollUp } from "../../../utils/utils";

interface sidebarProps {
  facetList: facetModel[] | null;
  setSearchResp: Dispatch<SetStateAction<searchResponseModel | null>>;
  searchKeyword: string;
  limit: number;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setFilterDict: Dispatch<SetStateAction<facetFilterModel[]>>;
  filterDict: facetFilterModel[];
  searchParams: any;
  setSearchParams: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Sidebar = (props: sidebarProps) => {
  let navigate = useNavigate();
  const [check, setCheck] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );
  const skip = 0;
  const handleClear = () => {
    getDatasetsSearchResp(props.setSearchResp, [], "*", skip, props.limit);
    check.forEach((value: boolean, key: string) => {
      setCheck(check.set(key, false));
    });
    props.setFilterDict([]);
    props.setSearchKeyword("");
    props.setPage(0);
    navigate(`?p=1`);
  };

  const handleFilter = () => {
    getDatasetsSearchResp(
      props.setSearchResp,
      props.filterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
    props.setSearchParams({ f: getFilterString(props.filterDict) })
    props.setSearchParams({ p: 1 })
    props.setPage(0)
    if (getFilterString(props.filterDict) === '') {
      if (props.searchKeyword === '' || props.searchKeyword === null) {
        navigate(`?p=1`)
      } else {
        navigate(`?q=${props.searchKeyword}&p=1`)
      }
    } else {
      if (props.searchKeyword === '' || props.searchKeyword === null) {
        navigate(`?f=${getFilterString(props.filterDict)}&p=1`)
      } else {
        navigate(`?q=${props.searchKeyword}&f=${getFilterString(props.filterDict)}&p=1`)
      }
    }
  };

  return (
    <div>
      <Row>
        <Search
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResp={props.setSearchResp}
          limit={props.limit}
          searchParams={props.searchParams}
          setSearchParams={props.setSearchParams}
          setPage={props.setPage}
          filterDict={props.filterDict}
        />
      </Row>
      {props.facetList === null || props.facetList.length < 1 ? null : (
        <div className="bg-light border p-2 rounded-3 pt-3">
          <Row className="position-relative w-100 px-0 mx-0">
            {props.facetList
              .sort((a, b) => (b.key < a.key ? 1 : -1))
              .map((facet, index) => (
                <Filter
                  facet={facet}
                  key={index}
                  check={check}
                  setCheck={setCheck}
                  setFilterDict={props.setFilterDict}
                  searchKeyword={props.searchKeyword}
                  filterDict={props.filterDict}
                />
              ))}
          </Row>
          <Row className="mb-2 mt-3 justify-content-end">
            <Col xs md lg={4}>
              <Button
                className="btn-warning w-100"
                onClick={() => {
                  handleClear();
                  scrollUp();
                }}
              >
                Clear
              </Button>
            </Col>
            <Col xs md lg={4} className="me-2">
              <Button
                className="btn-success w-100"
                onClick={() => {
                  handleFilter();
                  scrollUp();
                }}
              >
                Filter
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
