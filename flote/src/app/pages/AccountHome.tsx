import { socket } from "../../socket";
import { useState } from "react";

import AppLayout from "../../components/templates/AppLayout";
import SolidButton from "../../components/molecules/SolidButton";
import RegattaList from "../../components/molecules/RegattaList";
import { Regatta } from "../../types/Regatta";

// temp data
const NEW_REGATTA: Regatta = {
  id: "",
  name: "a new one",
  adminId: "0",
  timekeeperIds: ["2", "3"],
};

const REGATTAS: Regatta[] = [
  {
    id: "0",
    name: "a regatta",
    adminId: "0",
    timekeeperIds: ["2", "3"],
  },
  {
    id: "1",
    name: "another one",
    adminId: "0",
    timekeeperIds: ["2", "4"],
  },
];

export default function AccountHome() {
  const [regattas, setRegattas] = useState(REGATTAS); // TODO get request

  const handleCreateRegatta = () => {
    socket.emit("createRegatta", NEW_REGATTA);
    // TODO update UI
  };

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
