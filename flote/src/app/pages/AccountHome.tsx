import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

//import { EventResponse } from "@models/EventResponse";
import { Regatta } from "@models/Regatta";
import { socket } from "@src/socket";

import AppLayout from "@templates/AppLayout";
import RegattaList from "@atoms/RegattaList";
import ResponsiveCard from "@molecules/ResponsiveCard";

export default function AccountHome() {
  const [regattasAdmin, setRegattasAdmin] = useState<Regatta[]>([]);
  const [regattasTimekeeper, setRegattasTimekeeper] = useState<Regatta[]>([]);
  const { user } = useAuth0();

  useEffect(() => {
    socket.emit("getRegattas", user?.sub, (res) => {
      if (res.error) {
        console.error("getRegattas failed:", res.error);
      } else {
        setRegattasAdmin(res.data.regattas.admin);
        setRegattasTimekeeper(res.data.regattas.timekeeper);
      }
    });

    socket.on("newRegatta", (newRegatta) => {
      setRegattasAdmin((prevRegattas) => [...prevRegattas, newRegatta]);
    });

    return () => {
      socket.off("newRegatta");
    };
  }, [user]);

  return (
    <AppLayout className="flex flex-col md:flex-row gap-3">
      <ResponsiveCard title="my regattas">
        <RegattaList
          ariaLabel="list of regattas you admin"
          regattas={regattasAdmin}
        ></RegattaList>
      </ResponsiveCard>
      <ResponsiveCard title="shared with me">
        <RegattaList
          ariaLabel="list of regattas you timekeep for"
          regattas={regattasTimekeeper}
        ></RegattaList>
      </ResponsiveCard>
    </AppLayout>
  );
}
