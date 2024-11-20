import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";
import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";
import { Boat } from "@models/Boat";
import { Race } from "@models/Race";
import { EventResponse } from "@src/models/EventResponse";

export default function RegattaView() {
  const { regattaId } = useParams();
  const location = useLocation();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [regattaName, setRegattaName] = useState<string>("");
  const [races, setRaces] = useState<Race[]>([]); // Placeholder for races
  const [timekeepers, setTimekeepers] = useState([]); // Placeholder for timekeepers

  useEffect(() => {
    if (location.state?.regatta?.name) {
      setRegattaName(location.state.regatta.name);
    } else if (regattaId) {
      socket.emit("getRegattaById", regattaId, (res: EventResponse) => {
        if (res.error) {
          console.error("Failed to fetch regatta details:", res.error);
        } else {
          setRegattaName(res.data.regatta.name);
          setRaces(res.data.races);
          setBoats(res.data.boats);
          setTimekeepers(res.data.regatta.timekeeperIds);
        }
      });
    }
  }, [regattaId, location.state]);

  return (
    <AppLayout title={regattaName} subtitle="regatta">
      <div className="flex flex-col md:flex-row gap-3 flex-grow">
        <ResponsiveCard title="Boats">
          <List ariaLabel="List of boats" itemType="boat" items={boats} />
        </ResponsiveCard>
        <ResponsiveCard title="Races">
          <List ariaLabel="List of races" itemType="race" items={races} />
        </ResponsiveCard>
        <ResponsiveCard title="Timekeepers">
          <List
            ariaLabel="Timekeepers"
            itemType="timekeeper"
            items={timekeepers}
          />
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}
