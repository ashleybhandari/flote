import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";
import AppLayout from "@templates/AppLayout";
import BoatList from "@atoms/BoatList";
import ResponsiveCard from "@molecules/ResponsiveCard";

export default function RegattaView() {
  const { regattaId } = useParams();
  const location = useLocation();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [regattaName, setRegattaName] = useState<string>("");
  const [races, setRaces] = useState([]); // Placeholder for races
  const [timekeepers, setTimekeepers] = useState([]); // Placeholder for timekeepers

  useEffect(() => {
    if (location.state?.regatta?.name) {
      setRegattaName(location.state.regatta.name);
    } else if (regattaId) {
      socket.emit("getRegattaById", regattaId, (res) => {
        if (res.error) {
          console.error("Failed to fetch regatta details:", res.error);
        } else {
          setRegattaName(res.data.regatta.name);
        }
      });
    }

    if (location.state?.boats) {
      setBoats(location.state.boats);
    } else if (regattaId) {
      socket.emit("getBoats", regattaId, (res) => {
        if (res.error) {
          console.error("Failed to fetch boats:", res.error);
        } else {
          setBoats(res.data.boats);
        }
      });
    }

    socket.on("boatAdded", (newBoat) => {
      setBoats((prevBoats) => [...prevBoats, newBoat]);
    });

    return () => {
      socket.off("boatAdded");
    };
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
            <ul>
              <p>No races available yet!</p>
            </ul>
          </div>
        </ResponsiveCard>
        <ResponsiveCard title="Timekeepers">
          <div className="max-h-[300px] overflow-y-auto">
            <ul>
              <p>No timekeepers available yet!</p>
            </ul>
          </div>
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}