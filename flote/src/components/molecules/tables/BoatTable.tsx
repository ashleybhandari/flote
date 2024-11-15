import { useNavigate } from "react-router-dom";

import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

import { BOATS } from "./mock-data"; // TODO delete

type Props = {
  searchQuery: string;
};

export default function BoatTable({ searchQuery }: Props) {
  const navigate = useNavigate();
  const data = BOATS; // TODO get data

  const columns: SearchTableColumn[] = [
    { key: "date", label: "date" },
    { key: "name", label: "name" },
    { key: "id", label: "id" },
    { key: "race", label: "race" },
    { key: "action", label: "" },
  ];

  const rows: SearchTableRow[] = data.map((e) => {
    // TODO get date, race
    return {
      id: e._id!,
      date: new Date().toLocaleString(),
      name: e.name ?? "---",
      registrationId: e.registrationId,
      race: "race",
      action: <OpenExternalLinkButton />,
    };
  });

  const handleRowAction = (id) => {
    // TODO get link
    // navigate(`/regatta/${id}`);
  };

  return (
    <ResultsTable
      title="boats"
      columns={columns}
      rows={rows}
      onRowAction={handleRowAction}
    />
  );
}
