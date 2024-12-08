import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleAddRegatta = () => {
    navigate("/regatta/create");
  };

  useEffect(() => {
    socket.emit("getRegattas", user?.sub, (res: EventResponse) => {
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
  }, [user]);

  return (
    <AppLayout
      title="home"
      className="flex flex-col md:flex-row gap-3"
      hideBackButton
    >
      <ResponsiveCard title="my regattas" onAdd={handleAddRegatta}>
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
