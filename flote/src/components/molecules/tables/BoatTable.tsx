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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const rows: SearchTableRow[] = boats.map((e) => {
    return {
      id: e._id!,
      date: new Date().toLocaleString(), // TODO
      name: e.name ?? "---",
      registrationId: e.registrationId,
      participants: e.participantNames.join(", "),
      action: <OpenExternalLinkButton />,
    };
  });

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
