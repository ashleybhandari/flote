import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { EventResponse } from "@models/EventResponse";
import { Regatta } from "@models/Regatta";
import { socket } from "@src/socket";

import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";

export default function AccountHome() {
  const [regattasAdmin, setRegattasAdmin] = useState<Regatta[]>([]);
  const [regattasTimekeeper, setRegattasTimekeeper] = useState<Regatta[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    socket.emit("getRegattas", user?.sub, (res: EventResponse) => {
      if (res.error) {
        console.error("getRegattas failed:", res.error);
      } else {
        setRegattasAdmin(res.data.regattas.admin);
        setRegattasTimekeeper(res.data.regattas.timekeeper);
      }
    });
  }, [user]);

  return (
    <AppLayout className="flex flex-col md:flex-row gap-3">
      <ResponsiveCard title="my regattas">
        <List
          ariaLabel="list of regattas you admin"
          itemType="regatta"
          items={regattasAdmin}
        ></List>
      </ResponsiveCard>
      <ResponsiveCard title="shared with me">
        <List
          ariaLabel="list of regattas you timekeep for"
          itemType="regatta"
          items={regattasTimekeeper}
        ></List>
      </ResponsiveCard>
    </AppLayout>
  );
}
