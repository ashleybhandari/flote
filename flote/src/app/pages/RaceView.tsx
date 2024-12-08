import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";
// import StaticCard from "@atoms/cards/StaticCard";

import { Boat } from "@models/Boat";
import { Race } from "@models/Race";

import { socket } from "@src/socket";
import { EventResponse } from "@src/models/EventResponse";

export default function RaceView() {
  const { raceId } = useParams();
  const location = useLocation();

  const [raceName, setRaceName] = useState<string>("");
  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    if (location.state?.race?.name) {
      setRaceName(location.state.race.name);
    } else if (raceId) {
      socket.emit("getRaceById", raceId, (res: EventResponse) => {
        if (res.error) {
          console.error("Failed to fetch race details:", res.error);
        } else {
          console.log("Received response:", res);

          const { race, boats: fetchedBoats } = res.data;
          setRaceName(race.name);
          setBoats(fetchedBoats);
        }
      });
    }
  }, [raceId, location.state]);

  console.log("Current boats:", boats)

  return (
    <AppLayout title={raceName} subtitle="race" className="flex">
      <div className="grow flex flex-col lg:flex-row gap-3">
        <ResponsiveCard title="Boats in Race">
          <List
            ariaLabel="List of boats"
            itemType="race"
            items={boats}
          />
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}