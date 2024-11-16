import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EventResponse } from "@models/EventResponse";
import { Race } from "@models/Race";
import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";
import { socket } from "@src/socket";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

type Props = {
  searchQuery: string;
};

export default function RaceTable({ searchQuery }: Props) {
  const [races, setRaces] = useState<Race[]>([]);
  const navigate = useNavigate();

  const columns: SearchTableColumn[] = [
    { key: "date", label: "date" },
    { key: "name", label: "name" },
    { key: "regatta", label: "regatta" },
    { key: "action", label: "" },
  ];

  const rows: SearchTableRow[] = races.map((e) => {
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

  useEffect(() => {
    socket.emit("searchRaces", searchQuery, (res: EventResponse) => {
      if (res.error) {
        console.error("searchRaces failed:", res.error);
      } else {
        setRaces(res.data.races);
      }
    });
  }, [searchQuery]);

  return (
    <ResultsTable
      title="races"
      columns={columns}
      rows={rows}
      onRowAction={handleRowAction}
    />
  );
}
