import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EventResponse } from "@models/EventResponse";
import { Boat } from "@models/Boat";
import { SearchTableColumn } from "@models/SearchTableColumn";
import { SearchTableRow } from "@models/SearchTableRow";
import { socket } from "@src/socket";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

type Props = {
  searchQuery: string;
};

export default function BoatTable({ searchQuery }: Props) {
  const [boats, setBoats] = useState<Boat[]>([]);
  const navigate = useNavigate();

  const columns: SearchTableColumn[] = [
    { key: "date", label: "date" },
    { key: "name", label: "name" },
    { key: "registrationId", label: "id" },
    { key: "race", label: "race" },
    { key: "action", label: "" },
  ];

  const rows: SearchTableRow[] = boats.map((e) => {
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

  useEffect(() => {
    socket.emit("searchBoats", searchQuery, (res: EventResponse) => {
      if (res.error) {
        console.error("searchBoats failed:", res.error);
      } else {
        setBoats(res.data.boats);
      }
    });
  }, [searchQuery]);

  return (
    <ResultsTable
      title="boats"
      columns={columns}
      rows={rows}
      onRowAction={handleRowAction}
    />
  );
}
