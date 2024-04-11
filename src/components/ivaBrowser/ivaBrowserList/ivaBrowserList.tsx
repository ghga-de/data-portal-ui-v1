import { useCallback, useEffect, useState } from "react";
import { EmbeddedIVA, IVAStatus } from "../../../models/ivas";
import { User } from "../../../services/auth";
import { Button, Col, Row, Table } from "react-bootstrap";
import SortButton, { TableFields } from "../../../utils/sortButton";
import { transposeTableForHTML } from "../../../utils/utils";
import IVABrowserListCreateCodeModal from "./ivaBrowserListCreateCodeModal";
import IVABrowserListConfirmInvalidateModal from "./ivaBrowserListConfirmInvalidateModal";
import IVABrowserListConfirmTransmissionModal from "./ivaBrowserListConfirmTransmissionModal";

interface IVABrowserListProps {
  ivas: EmbeddedIVA[];
  user: User;
  onUpdate: any;
}

const IVABrowserList = (props: IVABrowserListProps) => {
  const [showConfirmInvalidateModal, setShowConfirmInvalidateModal] =
    useState(false);

  const [showConfirmTransmissionModal, setShowConfirmTransmissionModal] =
    useState(false);

  const [showCreateCodeModal, setShowCreateCodeModal] = useState(false);

  const InvalidateButton = (InvalidateButtonProps: { x: EmbeddedIVA }) => {
    return (
      <Button
        key={InvalidateButtonProps.x.id + "_invalidate_button"}
        className="py-0 text-white"
        variant="danger"
        onClick={() => {
          setSelectedIVA(InvalidateButtonProps.x);
          setShowConfirmInvalidateModal(true);
        }}
      >
        Invalidate
      </Button>
    );
  };

  const CreateCodeButton = (CreateCodeButtonProps: { x: EmbeddedIVA }) => {
    return (
      <Button
        key={`${CreateCodeButtonProps.x.id}_
            ${
              CreateCodeButtonProps.x.status === IVAStatus.CodeCreated
                ? "re"
                : ""
            }create_code_button`}
        className="py-0 text-white ms-1"
        variant="quaternary"
        onClick={() => {
          setSelectedIVA(CreateCodeButtonProps.x);
          setShowCreateCodeModal(true);
        }}
      >
        {CreateCodeButtonProps.x.status === IVAStatus.CodeCreated ? "Rec" : "C"}
        reate code
      </Button>
    );
  };

  const buildInnerTable = useCallback(() => {
    return [
      {
        header: "ID",
        data: props.ivas.map((x) => x.id),
        cssClasses: "d-none",
      },
      {
        header: "User",
        data: props.ivas.map((x) => x.user_name),
      },
      {
        header: "Type",
        data: props.ivas.map((x) =>
          x.type
            .toString()
            .split(/(?=[A-Z])/)
            .join(" ")
        ),
      },
      {
        header: "Address",
        data: props.ivas.map((x) => x.value),
      },
      {
        header: "Last Changed",
        data: props.ivas.map((x) => x.changed.split("T")[0]),
      },
      {
        header: "Status",
        data: props.ivas.map((x) => (
          <span
            className={
              x.status === IVAStatus.Verified
                ? "text-success"
                : x.status === IVAStatus.Unverified
                ? "text-secondary"
                : x.status === IVAStatus.CodeTransmitted
                ? "text-quaternary"
                : x.status === IVAStatus.CodeCreated ||
                  x.status === IVAStatus.CodeRequested
                ? "text-warning"
                : ""
            }
          >
            {x.status
              .toString()
              .split(/(?=[A-Z])/)
              .join(" ")}
          </span>
        )),
      },
      {
        header: "Actions",
        data: props.ivas.map((x: EmbeddedIVA) => {
          if (x.status === IVAStatus.CodeRequested) {
            return (
              <>
                <InvalidateButton x={x} />
                <CreateCodeButton x={x} />
              </>
            );
          }
          if (x.status === IVAStatus.CodeCreated) {
            return (
              <>
                <InvalidateButton x={x} />
                <Button
                  key={x.id + "_confirm_transmission_button"}
                  className="py-0 text-white ms-1"
                  variant="quaternary"
                  onClick={() => {
                    setSelectedIVA(x);
                    setShowConfirmTransmissionModal(true);
                  }}
                >
                  Confirm transmission
                </Button>
                <CreateCodeButton x={x} />
              </>
            );
          }
          if (x.status !== IVAStatus.Unverified) {
            return <InvalidateButton x={x} />;
          }
          return <></>;
        }),
      },
    ];
  }, [props.ivas]);

  const [innerTable, setInnerTable] = useState<TableFields[]>(
    buildInnerTable()
  );

  useEffect(() => {
    let table: TableFields[] = buildInnerTable();
    setInnerTable(table);
    setSortedData(transposeTableForHTML(table.map((x) => x.data)));
  }, [buildInnerTable, props.ivas]);

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
    if (selectedIVA) {
      sortedData.find(
        (x: any) =>
          x[innerTable.findIndex((x) => x.header === "ID")] === selectedIVA.id
      )[innerTable.findIndex((x) => x.header === "Status")] =
        selectedIVA.status;
    }
    let table: TableFields[] = buildInnerTable();
    setInnerTable(table);
    setSortedData(transposeTableForHTML(table.map((x) => x.data)));
  }

  const [selectedIVA, setSelectedIVA] = useState<EmbeddedIVA | undefined>();

  return (
    <div>
      <IVABrowserListCreateCodeModal
        show={showCreateCodeModal}
        setShow={setShowCreateCodeModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        setShowConfirmTransmissionModal={setShowConfirmTransmissionModal}
        onUpdate={onUpdate}
      />
      <IVABrowserListConfirmInvalidateModal
        show={showConfirmInvalidateModal}
        setShow={setShowConfirmInvalidateModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        onUpdate={onUpdate}
      />
      <IVABrowserListConfirmTransmissionModal
        show={showConfirmTransmissionModal}
        setShow={setShowConfirmTransmissionModal}
        setShowCreateCodeModal={setShowCreateCodeModal}
        selectedIVA={selectedIVA}
        setSelectedIVA={setSelectedIVA}
        onUpdate={onUpdate}
      />
      <Table className="w-lg-100" style={{ minWidth: "800px" }}>
        <thead className="border-light-3 border-1">
          <tr>
            {innerTable.map((y: any, idy: number) => {
              if (y.header !== "ID") {
                return (
                  <th
                    className={
                      y.cssClasses + " align-middle bg-quinary text-white lh-1"
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
              <tr key={"row_" + idy}>
                {y.map((z: any, idz: any) => {
                  if (idz !== 0) {
                    return (
                      <td
                        className={innerTable[idz].cssClasses}
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

export default IVABrowserList;
