import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { Breadcrumb } from "@src/models/Breadcrumb";
import { Boat } from "@models/Boat";
import { EventResponse } from "@src/models/EventResponse";
import { Race } from "@src/models/Race";
import { Regatta } from "@src/models/Regatta";
import { socket } from "@src/socket";

import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";
// import StaticCard from "@atoms/cards/StaticCard";

//import { useNavigate } from "react-router-dom";
//import { Button } from "@nextui-org/button";
//import ConfirmationModal from "@molecules/modals/ConfirmationModal";
// import { format } from "date-fns";
import {getCounterStr} from "./RaceTimer/timeListUtils.tsx"; 

export default function RaceView() {
  const { raceId } = useParams();
  //const navigate = useNavigate();
  const location = useLocation();

  const [regatta, setRegatta] = useState<Regatta>();
  const [race, setRace] = useState<Race>();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState({ regatta: true, race: true });
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    socket.emit("getRegattaById", race?.regattaId, (res: EventResponse) => {
      if (res.error) {
        console.error("Failed to fetch regatta:", res.error);
      } else {
        setRegatta(res.data.regatta);
        setIsLoading((prev) => ({ ...prev, regatta: false }));
      }
    });

    if (location.state?.race) {
      setRace(location.state.race);
      setIsLoading((prev) => ({ ...prev, race: false }));
    } else if (raceId) {
      socket.emit("getRaceById", raceId, (res: EventResponse) => {
        if (res.error) {
          console.error("Failed to fetch race details:", res.error);
        } else {
          console.log("Received response:", res);

          const { race, boats: fetchedBoats } = res.data;
          fetchedBoats.sort((a: Boat, b: Boat) => {
            if (!a.finishTime) return 1;
            if (!b.finishTime) return -1;
            return (
              new Date(a.finishTime).getTime() -
              new Date(b.finishTime).getTime()
            );
          });

          setRace(race);
          setBoats(fetchedBoats);
          setIsLoading((prev) => ({ ...prev, race: false }));
        }
      });
    }
  });
  
  console.log("Current boats:", boats);
  const participants = boats.flatMap((boat) => boat.participantNames || []);
  console.log("Participants:", participants);

  const formatTime = (time?: Date | string, boat: boolean) => {
    if (!time) return "No Time Available";
    if(boat){
        time = new Date(time);
        return getCounterStr(time.getTime());
    }

    return new Date(time).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const raceStart = formatTime(startTime, false);

  const boatsWithFinishTimes = boats.map((boat) => ({
    ...boat,
    displayName: `${boat.name || "Unnamed Boat"} (${formatTime(boat.finishTime, true)})`,
    }));

  console.log("Boats with times: ", boatsWithFinishTimes);

  const boatTitles = boatsWithFinishTimes.map(
    (eachBoat) => eachBoat.displayName
  );

  const breadcrumbs: Breadcrumb[] = [
    { name: "Home", href: "/home" },
    { name: regatta?.name ?? "regatta", href: `/regatta/${regatta?._id}` },
    { name: race?.name ?? "race" },
  ];

  return (
    <AppLayout
      isLoading={isLoading.regatta || isLoading.race}
      title={race?.name}
      subtitle="race"
      breadcrumbs={breadcrumbs}
    >
      <div className="grow flex flex-col lg:flex-row gap-3">
        <ResponsiveCard title="Race Start Time">
          <p>{raceStart}</p>
        </ResponsiveCard>
        <ResponsiveCard title="Boats in Race">
          <List ariaLabel="List of boats" itemType="race" items={boatTitles} />
        </ResponsiveCard>
        <ResponsiveCard title="Participants in Race">
          <List
            ariaLabel="List of Participants"
            itemType="race"
            items={participants}
          />
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}
