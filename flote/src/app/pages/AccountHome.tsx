import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { EventResponse } from "../../types/EventResponse";
import { Regatta } from "../../types/Regatta";
import { socket } from "../../socket";

import AppLayout from "../../components/templates/AppLayout";
import RegattaList from "../../components/molecules/RegattaList";
import SolidButton from "../../components/molecules/SolidButton";

export default function AccountHome() {
  const [regattas, setRegattas] = useState<Regatta[]>([]);
  const { user } = useAuth0();

  const handleCreateRegatta = () => {
    if (!user?.sub) return;

    // mock data
    const NEW_REGATTA: Regatta = {
      name: "a new one",
      adminId: user.sub,
      timekeeperIds: ["2", "3"],
    };

    socket.emit("createRegatta", NEW_REGATTA, (res: EventResponse) => {
      if (res.error) {
        console.error(res.error);
      } else {
        // update UI
        const id = res.data;
        setRegattas((prev) => [...prev, {...NEW_REGATTA, id }]);
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
