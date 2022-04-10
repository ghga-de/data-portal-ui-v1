import React, { Dispatch, SetStateAction, useState } from "react";
import Search from "./searchbar";
import Filter from "./filter";
import { Row, Col, Button } from "react-bootstrap";
import { facetModel, facetFilterModel } from "../../../models/facets";
import { searchResponseModel } from "../../../models/dataset";
import { getDatasetsSearchResp } from "../../../api/browse";
import { getFilterString } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { scrollUp } from "../../../utils/utils";

interface sidebarProps {
  facetList: facetModel[] | null;
  setSearchResults: Dispatch<SetStateAction<searchResponseModel | null>>;
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
  const [appliedFilterDict, setAppliedFilterDict] = useState<
    facetFilterModel[]
  >([]);
  const [check, setCheck] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );
  const skip = 0;

  React.useEffect(() => {
    const displayFilters = () => {
      if (check.size === 0) {
        for (var item of props.filterDict) {
          setCheck(check.set(item.key + ":" + item.value, true));
        }
      }
    };
    displayFilters();
  });
  const handleClear = () => {
    getDatasetsSearchResp(props.setSearchResults, [], "*", skip, props.limit);
    check.forEach((value: boolean, key: string) => {
      setCheck(check.set(key, false));
    });
    props.setFilterDict([]);
    setAppliedFilterDict([]);
    props.setSearchKeyword("");
    props.setPage(0);
    navigate(`?p=1`);
  };

  const handleFilter = () => {
    getDatasetsSearchResp(
      props.setSearchResults,
      appliedFilterDict,
      props.searchKeyword,
      skip,
      props.limit
    );
    props.setFilterDict([...appliedFilterDict]);
    props.setSearchParams({ f: getFilterString(props.filterDict) });
    props.setSearchParams({ p: 1 });
    props.setPage(0);
    if (getFilterString(appliedFilterDict) === "") {
      if (props.searchKeyword === "" || props.searchKeyword === null) {
        navigate(`?p=1`);
      } else {
        navigate(`?q=${props.searchKeyword}&p=1`);
      }
    } else {
      if (props.searchKeyword === "" || props.searchKeyword === null) {
        navigate(`?f=${getFilterString(appliedFilterDict)}&p=1`);
      } else {
        navigate(
          `?q=${props.searchKeyword}&f=${getFilterString(
            appliedFilterDict
          )}&p=1`
        );
      }
    }
  };

  return (
    <>
      <Row>
        <Search
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
          setSearchResults={props.setSearchResults}
          limit={props.limit}
          searchParams={props.searchParams}
          setSearchParams={props.setSearchParams}
          setPage={props.setPage}
          filterDict={props.filterDict}
        />
      </Row>
      {props.facetList === null || props.facetList.length === 0 ? null : (
        <Row className="position-relative w-100 px-1 mx-0">
          {props.facetList
            .sort((a, b) => (b.key < a.key ? 1 : -1))
            .map((facet, index) => (
              <Filter
                facet={facet}
                key={index}
                check={check}
                setCheck={setCheck}
                searchKeyword={props.searchKeyword}
                appliedFilterDict={appliedFilterDict}
                setAppliedFilterDict={setAppliedFilterDict}
              />
            ))}
        </Row>
      )}
      <Row className="mb-2 mt-3 justify-content-end">
        <Col>
          <Button
            className="btn-gray w-100 rounded-0"
            onClick={() => {
              handleClear();
              scrollUp();
            }}
          >
            Clear
          </Button>
        </Col>
        {props.facetList === null || props.facetList.length === 0 ? null : (
          <Col>
            <Button
              className="btn-primary w-100 rounded-0"
              onClick={() => {
                handleFilter();
                scrollUp();
              }}
            >
              Filter
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Sidebar;
