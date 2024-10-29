import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { EventResponse } from "../../types/EventResponse";
import { Regatta } from "../../types/Regatta";
import { socket } from "../../socket";

import AppLayout from "../../components/templates/AppLayout";
import Input from "../../components/molecules/Input";
import RegattaList from "../../components/molecules/RegattaList";

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
        console.error(res.error);
      } else {
        const id = res.data.id;
        setRegattas((prev) => [...prev, { ...NEW_REGATTA, id }]);
      }
    });
  };

  // initialize regattas
  useEffect(() => {
    if (!user?.sub) return;

    socket.emit("getRegattas", user.sub, (res: EventResponse) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setRegattas(res.data);
      }
    });
  }, [user]);

  // TODO form to get regatta details
  return (
    <AppLayout>
      <div className="flex flex-row items-center">
        <Input label="Regatta Name" />
        <button
          className="fa-solid fa-plus text-white rounded-full w-10 h-10 bg-tertiary hover:bg-tertiary/90 active:bg-tertiary"
          onClick={handleCreateRegatta}
        ></button>
      </div>
      <RegattaList regattas={regattas} className="mt-14" />
    </AppLayout>
  );
}
