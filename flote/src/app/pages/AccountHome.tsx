import { useEffect, useState } from "react";

import { EventResponse } from "../../types/EventResponse";
import { Regatta } from "../../types/Regatta";
import { socket } from "../../socket";

import AppLayout from "../../components/templates/AppLayout";
import RegattaList from "../../components/molecules/RegattaList";
import SolidButton from "../../components/molecules/SolidButton";

export default function AccountHome() {
  const [regattas, setRegattas] = useState<Regatta[]>([]);

  const handleCreateRegatta = () => {
    // mock data
    const NEW_REGATTA: Regatta = {
      id: "2",
      name: "a new one",
      adminId: "0", // TODO get actual id
      timekeeperIds: ["2", "3"],
    };

    socket.emit("createRegatta", NEW_REGATTA, (res: EventResponse) => {
      if (res.error) {
        console.error(res.error);
      } else {
        // update UI
        setRegattas((prev) => [...prev, NEW_REGATTA]);
      }
    });
  };

  // initialize regattas
  useEffect(() => {
    const userId = "0"; // TODO get actual id

    socket.emit("getRegattas", userId, (res: EventResponse) => {
      if (res.error) {
        console.error(res.error);
      } else {
        setRegattas(res.data);
      }
    });
  }, []);

  // TODO form to get regatta details
  return (
    <AppLayout>
      <SolidButton
        className="bg-tertiary hover:bg-tertiary/90 active:bg-tertiary"
        onClick={handleCreateRegatta}
      >
        create regatta
      </SolidButton>
      <RegattaList regattas={regattas} className="mt-20" />
    </AppLayout>
  );
}
