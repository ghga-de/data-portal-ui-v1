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

import { useCallback, useEffect, useState } from "react";
import { AccessRequest } from "../../../models/submissionsAndRequests";
import { Col, Row, Table } from "react-bootstrap";
import AccessRequestModal from "./accessRequestModal";
import { User } from "../../../services/auth";
import { IVA } from "../../../models/ivas";
import { getIVAs } from "../../../services/ivas";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";

interface AccessRequestListProps {
  requests: AccessRequest[];
  user: User;
  onUpdate: () => void;
}

const AccessRequestsList = (props: AccessRequestListProps) => {
  const buildInnerTable = useCallback(() => {
    return [
      {
        header: "ID",
        data: props.requests.map((x) => x.id),
        cssClasses: "d-none",
      },
      {
        header: "Dataset",
        data: props.requests.map((x) => x.dataset_id),
      },
      {
        header: "User",
        data: props.requests.map((x) => x.full_user_name),
      },
      {
        header: "Starts",
        data: props.requests.map((x) => x.access_starts.split("T")[0]),
      },
      {
        header: "Ends",
        data: props.requests.map((x) => x.access_ends.split("T")[0]),
      },
      {
        header: "Requested",
        data: props.requests.map((x) => x.request_created.split("T")[0]),
      },
      {
        header: "Status",
        data: props.requests.map((x) => x.status),
      },
    ];
  }, [props.requests]);

  const [innerTable, setInnerTable] = useState<TableFields[]>(
    buildInnerTable()
  );

  useEffect(() => {
    let table: TableFields[] = buildInnerTable();
    setInnerTable(table);
    setSortedData(transposeTableForHTML(table.map((x) => x.data)));
  }, [buildInnerTable, props.requests]);

  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(innerTable.map((x) => x.data))
  );

  let tableDefinition = {
    sortDefinition,
    setSortDefinition,
    sortedData,
    setSortedData,
    table: innerTable,
  };

  function onUpdate() {
    props.onUpdate();
    if (selectedAccessRequest) {
      sortedData.find(
        (x: any) =>
          x[innerTable.findIndex((x) => x.header === "ID")] ===
          selectedAccessRequest.id
      )[innerTable.findIndex((x) => x.header === "Status")] =
        selectedAccessRequest.status;
    }
  }

  const [showModal, setShowModal] = useState(false);

  const [userIVAs, setUserIVAs] = useState<IVA[]>([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccessRequest(undefined);
    setUserIVAs([]);
  };
  const handleShowModal = (accessRequest: AccessRequest) => {
    setSelectedAccessRequest(accessRequest);
    getIVAs(props.user.ext_id, setUserIVAs);
    setShowModal(true);
  };

  const [selectedAccessRequest, setSelectedAccessRequest] = useState<
    AccessRequest | undefined
  >();

  return (
    <div>
      <AccessRequestModal
        show={showModal}
        setShow={setShowModal}
        userId={props.user.id}
        handleClose={handleCloseModal}
        handleShow={handleShowModal}
        accessRequest={selectedAccessRequest}
        onUpdate={onUpdate}
        userIVAs={userIVAs}
      />
      <Table className="w-lg-100" style={{ minWidth: "800px" }}>
        <thead className="border-light-3 border-1">
          <tr>
            {innerTable.map((y: any, idy: number) => {
              if (y.header !== "ID") {
                return (
                  <th
                    className={
                      y.cssClasses +
                      " align-middle bg-secondary text-white lh-1"
                    }
                    key={"table_th_" + idy}
                    style={{ position: "sticky", top: "0px" }}
                  >
                    <Row className="flex-nowrap align-items-center">
                      <Col xs={"auto"} className="pe-0 ps-2">
                        <SortButton
                          tableDefinition={tableDefinition}
                          index={idy}
                          buttonVariant="outline-white"
                        />
                      </Col>
                      <Col className="ps-0">{y.header}</Col>
                    </Row>
                  </th>
                );
              } else
                return <th key={"table_th_" + idy} className="d-none"></th>;
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((y: any, idy: number) => {
            return (
              <tr
                role="button"
                title={"View access request"}
                key={"row_" + idy}
                onClick={() =>
                  handleShowModal(
                    props.requests.filter(
                      (x) =>
                        x.id ===
                        y[innerTable.findIndex((x) => x.header === "ID")]
                    )[0]
                  )
                }
              >
                {y.map((z: any, idz: any) => {
                  if (idz !== 0) {
                    return (
                      <td
                        className={
                          innerTable[idz].cssClasses +
                          y.find((x: any) => x === "allowed")
                            ? "text-success"
                            : y.find((x: any) => x === "denied")
                            ? "text-danger"
                            : ""
                        }
                        key={"cell_" + idz + "_row_" + idy}
                      >
                        {z}
                      </td>
                    );
                  } else
                    return (
                      <td
                        key={"cell_" + idz + "_row_" + idy}
                        className="d-none"
                      ></td>
                    );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AccessRequestsList;
