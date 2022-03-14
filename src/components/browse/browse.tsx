import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import DatasetList from "./datasetlist/datasetList";
import Sidebar from "./sidebar/sidebar";
import { searchResponseModel, hitModel } from "../../models/dataset";
import { facetFilterModel, facetModel } from "../../models/facets";
import { getDatasetsSearchResp } from "../../api/browse";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(parseInt(searchParams.get("p") || "0"))
  const [limit, setLimit] = React.useState(10);
  let skip = page === 0 ? 0 : (page - 1) * limit;
  const [filterDict, setFilterDict] = React.useState<facetFilterModel[]>([]);
  const [searchKeyword, setSearchKeyword] = React.useState(searchParams.get("q") || '');
  const [searchResults, setSearchResp] = React.useState<searchResponseModel | null>(null);

  React.useEffect(() => {
    const getData = () => {
      getDatasetsSearchResp(setSearchResp, filterDict, searchKeyword, skip, limit);
    };
    getData();
  }// eslint-disable-next-line react-hooks/exhaustive-deps
    , [])

  var dsList: hitModel[] | null = null;
  var facetList: facetModel[] | null = null;
  var dsCount: number = 0;

  if (searchResults !== null) {
    if (searchResults.hits.length > 0) {
      dsList = searchResults.hits;
      facetList = searchResults.facets;
      dsCount = searchResults.count;
    } else {
      dsList = [];
      facetList = [];
      dsCount = 0;
    }
  }

  return (
    <Container>
      <Row>
        <Col xs md lg={3}>
          <Sidebar searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            facetList={facetList}
            setSearchResp={setSearchResp}
            setFilterDict={setFilterDict}
            filterDict={filterDict}
            limit={limit}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            page={page}
            setPage={setPage} />
        </Col>
        <Col xs md lg={9}>
          <DatasetList searchKeyword={searchKeyword}
            setSearchResp={setSearchResp}
            dsCount={dsCount}
            dsList={dsList}
            filterDict={filterDict}
            limit={limit}
            setLimit={setLimit}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            page={page}
            setPage={setPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
