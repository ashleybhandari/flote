import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EventResponse } from "@models/EventResponse";
import { Race } from "@models/Race";
import { RACE_COLUMNS } from "./columns";
import { SearchTableRow } from "@models/SearchTableRow";
import { socket } from "@src/socket";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

type Props = {
  searchQuery: string;
};

export default function RaceTable({ searchQuery }: Props) {
  const [races, setRaces] = useState<Race[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const rows: SearchTableRow[] = races.map((e) => {
    return {
      id: e._id!,
      date: new Date().toLocaleString(), // TODO
      name: e.name,
      regatta: "", // TODO
      action: <OpenExternalLinkButton />,
    };
  });

  const handleRowAction = (id: React.Key) => {
    // TODO get link
    // navigate(`/regatta/${id}`);
  };

  useEffect(() => {
    socket.emit("searchRaces", searchQuery, (res: EventResponse) => {
      if (res.error) {
        console.error("searchRaces failed:", res.error);
      } else {
        setRaces(res.data.races);
        setIsLoading(false);
      }
    });
  }, [searchQuery]);

  return (
    <ResultsTable
      title="races"
      columns={RACE_COLUMNS}
      rows={rows}
      onRowAction={handleRowAction}
      isLoading={isLoading}
    />
  );
}
