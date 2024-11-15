import { useNavigate } from "react-router-dom";

import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

import { RACES } from "./mock-data"; // TODO delete

type Props = {
  searchQuery: string;
};

export default function RaceTable({ searchQuery }: Props) {
  const navigate = useNavigate();
  const data = RACES; // TODO get data

  const columns: SearchTableColumn[] = [
    { key: "date", label: "date" },
    { key: "name", label: "name" },
    { key: "regatta", label: "regatta" },
    { key: "action", label: "" },
  ];

  const rows: SearchTableRow[] = data.map((e) => {
    return {
      id: e._id!,
      date: new Date().toLocaleString(), // TODO
      name: e.name,
      regatta: "regatta", // TODO
      action: <OpenExternalLinkButton />,
    };
  });

  const handleRowAction = (id) => {
    // TODO get link
    // navigate(`/regatta/${id}`);
  };

  return (
    <ResultsTable
      title="races"
      columns={columns}
      rows={rows}
      onRowAction={handleRowAction}
    />
  );
}
