import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EventResponse } from "@models/EventResponse";
import { Boat } from "@models/Boat";
import { BOAT_COLUMNS } from "./columns";
import { SearchTableRow } from "@models/SearchTableRow";
import { socket } from "@src/socket";

import OpenExternalLinkButton from "@atoms/icon-buttons/OpenExternalLinkButton";
import ResultsTable from "@atoms/ResultsTable";

type Props = {
  searchQuery: string;
};

export default function BoatTable({ searchQuery }: Props) {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [rows, setRows] = useState<SearchTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowAction = (id: React.Key) => {
    const boat = boats.find((b) => b._id === id);
    if (boat?.regattaId) navigate(`/regatta/${boat.regattaId}/boat/${id}`);
  };

  useEffect(() => {
    socket.emit("searchBoats", searchQuery, (res: EventResponse) => {
      if (res.error) {
        console.error("searchBoats failed:", res.error);
      } else {
        setBoats(res.data.boats);
        setIsLoading(false);
      }
    });
  }, [searchQuery]);

  useEffect(() => {
    setRows([]);

    boats.forEach((boat) => {
      let date = "TBD";
      socket.emit("getRaceById", boat.raceId, (res: EventResponse) => {
        if (res.error) {
          const startTime = res.data.race?.startTime;
          if (startTime) date = new Date(startTime).toLocaleDateString();
        } else {
          const row: SearchTableRow = {
            id: boat._id!,
            date,
            name: boat.name ?? "---",
            registrationId: boat.registrationId,
            participants: boat.participantNames.join(", "),
            action: <OpenExternalLinkButton />,
          };

          setRows((rows) => [...rows, row]);
        }
      });
    });
  }, [boats]);

  return (
    <ResultsTable
      title="boats"
      columns={BOAT_COLUMNS}
      rows={rows}
      onRowAction={handleRowAction}
      isLoading={isLoading}
    />
  );
}
