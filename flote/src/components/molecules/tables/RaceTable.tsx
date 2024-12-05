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
  const [rows, setRows] = useState<SearchTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowAction = (id: React.Key) => {
    const race = races.find((r) => r._id === id);
    if (race?.regattaId) navigate(`/regatta/${race.regattaId}/race/${id}`);
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

  useEffect(() => {
    setRows([]);

    races.forEach((race) => {
      socket.emit("getRegattaById", race.regattaId, (res: EventResponse) => {
        if (res.error) {
          console.error("getRegattaById failed:", res.error);
        } else {
          const date = race.startTime
            ? new Date(race.startTime).toLocaleDateString()
            : "TBD";
          const regatta = res.data.regatta.name ?? "---";

          const row: SearchTableRow = {
            id: race._id!,
            date,
            name: race.name,
            regatta,
            action: <OpenExternalLinkButton />,
          };

          setRows((rows) => [...rows, row]);
        }
      });
    });
  }, [races]);

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
