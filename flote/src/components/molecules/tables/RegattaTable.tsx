import { useNavigate } from "react-router-dom";

import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";

import OpenExternalLinkIcon from "@atoms/icons/OpenExternalLinkIcon";
import ResultsTable from "@atoms/ResultsTable";

import { REGATTAS } from "./mock-data"; // TODO delete

type Props = {
  searchQuery: string;
};

export default function RegattaTable({ searchQuery }: Props) {
  const navigate = useNavigate();
  const data = REGATTAS; // TODO get data

  const columns: SearchTableColumn[] = [
    { key: "date", label: "date" },
    { key: "name", label: "name" },
    { key: "action", label: "" },
  ];

  const rows: SearchTableRow[] = data.map((e) => {
    // TODO get date
    return {
      id: e._id!,
      date: new Date().toLocaleString(),
      name: e.name,
      action: (
        <button className="float-end">
          <OpenExternalLinkIcon />
        </button>
      ),
    };
  });

  const handleRowAction = (id) => {
    navigate(`/regatta/${id}`);
  };

  return (
    <ResultsTable
      title="regattas"
      columns={columns}
      rows={rows}
      onRowAction={handleRowAction}
    />
  );
}
