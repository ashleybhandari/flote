import { useParams } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { EventResponse } from "@models/EventResponse";
import { Race } from "@models/Race";
import { socket } from "@src/socket";

import AppLayout from "@templates/AppLayout";
import List from "@src/components/atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";

export default function RegattaView() {
  const { regattaId } = useParams();
  const [regattaName, setName] = useState<string>("");
  const [adminId, setAdmin] = useState<string>("");
  const [regTimekeepers, setTimekeepers] = useState<string[]>([]);
  const [regattaRaces, setRaces] = useState<Race[]>([]);
  const { user } = useAuth0();

  // Requires imports
  useEffect(() => {
    socket.emit(
      "getRegattaById",
      regattaId,
      user?.sub,
      (res: EventResponse) => {
        if (res.error) {
          console.error("getRegattaById failed:", res.error);
        } else {
          const reg = res.data.regatta.reg.at(0);
          setName(reg.name);
          setAdmin(res.data.regatta.userId); //Can get another way: reg.adminId
          setTimekeepers(reg.timekeeperIds);
          setRaces(res.data.regatta.races);
          console.log(reg);
        }
      }
    );
  }, [regattaId, user]);

  return (
    <AppLayout className="flex flex-col gap-3">
      <ResponsiveCard title={regattaName}>
        <p>Admin: {adminId}</p>
        <br></br>
        <p>Timekeepers: {regTimekeepers}</p>
      </ResponsiveCard>
      <ResponsiveCard title="Races">
        <List
          ariaLabel="list of races in regatta"
          itemType="race"
          items={regattaRaces}
        ></List>
      </ResponsiveCard>
    </AppLayout>
  );
}
