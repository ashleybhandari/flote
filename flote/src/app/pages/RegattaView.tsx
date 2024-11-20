import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";
import AppLayout from "@templates/AppLayout";
import BoatList from "@atoms/BoatList";
import RaceList from "@atoms/RaceList";
import ResponsiveCard from "@molecules/ResponsiveCard";
import { Boat } from "@models/Boat";
import { Race } from "@models/Race";
import { EventResponse } from "@src/models/EventResponse";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

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
    <AppLayout>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary opacity-50 rounded-lg"></div>

        <div className="relative flex items-baseline space-x-4">
          <h1 className="text-7xl font-bold text-white leading-tight">{regattaName}</h1>
          <span className="text-2xl font-medium text-white uppercase">REGATTA</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 flex-grow">
        <ResponsiveCard title="Boats">
          <div className="max-h-[300px] overflow-y-auto">
            <BoatList ariaLabel="List of boats" boats={boats} />
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="Races">
          <div className="max-h-[300px] overflow-y-auto">
            <RaceList ariaLabel="List of races" races={races}/>
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="Timekeepers">
          <div className="max-h-[300px] overflow-y-auto">
          <Listbox
            aria-label="Timekeepers"
            emptyContent={<p>Nothing yet!</p>}
            classNames={{ list: "max-h-[400px] overflow-y-scroll" }}
          >
          {timekeepers.map((t, i) => (
              <ListboxItem key={i} >
                {t}
          </ListboxItem>
            ))}
    </Listbox>
          </div>
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}