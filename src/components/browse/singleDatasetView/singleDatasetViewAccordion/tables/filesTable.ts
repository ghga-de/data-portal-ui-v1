import { useState } from "react";
import { datasetEmbeddedModel } from "../../../../../models/dataset";
import { parseBytes, transposeTableForHTML } from "../../../../../utils/utils";
import {
  SDSVTableDefinition,
  TableFields,
} from "../../../../../utils/sortButton";

interface ExperimentsTableProps {
  details: datasetEmbeddedModel;
}

/**
 * This function creates the schema for the file summary table,
 * which is one of three tables in the dataset details view.
 * @param props - Object containing the data and details.
 * @param fileSize - File size in bytes to be displayed on table
 * @returns The table definition object that includes table content, button text and definitions.
 */
export const FilesTable = (props: ExperimentsTableProps, fileSize: number) => {
  const [sortDefinition, setSortDefinition] = useState<{
    key: number;
    order: number;
  }>({
    key: 0,
    order: 0,
  });

  let filesTable: TableFields[] = [
    {
      header: "File name",
      data: props.details.has_file.map((x) => x.name),
      cssClasses: "text-break",
    },
    {
      header: "File Type",
      data: props.details.has_file.map((x) => x.format.toUpperCase()),
      cssClasses: "",
    },
    {
      header: "Size",
      data: props.details.has_file.map((x) => x.size),
      cssClasses: "",
    },
    {
      header: "Checksum",
      data: props.details.has_file.map(
        (x) => x.checksum_type + ":" + x.checksum
      ),
      cssClasses: "",
    },
  ];

  const [sortedData, setSortedData] = useState<any>(
    transposeTableForHTML(filesTable.map((x) => x.data))
  );

  const filesTableDef: SDSVTableDefinition = {
    table: filesTable,
    buttonText:
      props.details.has_file !== null
        ? "File Summary (" +
          props.details.has_file.length +
          " files: " +
          parseBytes(fileSize) +
          ")"
        : "File Summary",
    sortDefinition: sortDefinition,
    setSortDefinition: setSortDefinition,
    sortedData: sortedData,
    setSortedData: setSortedData,
  };

  return filesTableDef;
};
