import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { EventResponse } from "@models/EventResponse";
import { Regatta } from "@models/Regatta";
import { socket } from "@src/socket";

import AppLayout from "@templates/AppLayout";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import RegattaList from "@molecules/RegattaList";

export default function AccountHome() {
  const [regattas, setRegattas] = useState<Regatta[]>([]);
  const { user } = useAuth0();

  const handleCreateRegatta = () => {
    if (!user?.sub) return;

    // temp for demo
    const NEW_REGATTA: Regatta = {
      name: document.getElementsByTagName("input")[0].value,
      adminId: user.sub,
      timekeeperIds: [],
    };

    socket.emit("createRegatta", NEW_REGATTA, (res: EventResponse) => {
      if (res.error) {
        console.error("createRegatta failed:", res.error);
      } else {
        const _id = res.data.id;
        setRegattas((prev) => [...prev, { ...NEW_REGATTA, _id }]);
      }
    });
  };

  // initialize regattas
  useEffect(() => {
    if (!user?.sub) return;

    socket.emit("getRegattasAdmin", user.sub, (res: EventResponse) => {
      if (res.error) {
        console.error("getRegattaAdmin failed:", res.error);
      } else {
        setRegattas(res.data.regattas);
      }
    });
  }, [user]);

  return (
    <AppLayout>
      <div className="flex flex-row items-center gap-2">
        <Input label="Regatta Name" className="w-72" />
        <Button
          isIconOnly
          color="primary"
          radius="full"
          onClick={handleCreateRegatta}
          className="fa-solid fa-plus"
        ></Button>
      </div>
      <RegattaList regattas={regattas} className="mt-14" />
    </AppLayout>
  );
}
