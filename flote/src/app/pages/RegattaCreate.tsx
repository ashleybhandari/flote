import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Regatta } from "@models/Regatta";
import { socket } from "@src/socket";
import Background from "@atoms/Background";
import { useNavigate } from "react-router-dom";
import AppLayout from "@templates/AppLayout";
import RegattaList from "@atoms/RegattaList";
import RegattaResponsiveCard from "@molecules/RegattaResponsiveCard";
import { EventResponse } from "@src/models/EventResponse";

export default function RegattaCreate() {
  const [timekeepers, setTimekeepers] = useState<Regatta[]>([]);
  const [boats, setBoats] = useState<Boat[]>([]);
  const [regattaName, setRegattaName] = useState<string>("");
  const [regattaId, setRegattaId] = useState<string | null>(null);

  const { user } = useAuth0();
  const navigate = useNavigate();

  const MockBoat = (): Boat => ({
    registrationId: "12345",
    name: `Sailboat ${boats.length + 1}`,
    participantNames: ["Avery", "Ryan"],
    regattaId: regattaId || "",
  });

  const regattaCreationHandler = () => {
    if (!regattaName.trim()) return;

    socket.emit("createRegatta", { name: regattaName, adminId: user?.sub }, (res: EventResponse) => {
      if (res.error) {
        console.error("Regatta creation failed:", res.error);
      } else {
        console.log("New regatta created:", res.data);
        const createdRegattaId = res.data.id;
        setRegattaId(createdRegattaId);

        boats.forEach((boat) => {
          boat.regattaId = createdRegattaId;
        });

        boats.forEach((boat) => {
          socket.emit("addBoats", boat, (x: EventResponse) => {
            if (x.error) {
              console.error("Boat addition failed:", x.error);
            } else {
              console.log("Boat successfully added:", x.data);
            }
          });
        });

        navigate(`/regatta/${createdRegattaId}`, {
          state: { regatta: res.data, boats: boats },
        });
      }
    });
  };

  const addBoat = () => {
    const newBoat = MockBoat();
    newBoat.regattaId = regattaId;

    setBoats((prevBoats) => {
      const updatedBoats = [...prevBoats, newBoat];
      console.log("Boat added:", newBoat);
      return updatedBoats;
    });
  };

  return (
    <Background className="flex flex-col items-center justify-between min-h-screen overflow-hidden">
      <AppLayout className="flex flex-col gap-6 flex-grow">
        <center>
          <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-6 w-full max-w-4xl mb-6">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-2xl font-semibold">Regatta Creation</h1>
              <div className="mt-4 w-full max-w-md">
                <Input
                  aria-label="Enter Regatta name"
                  value={regattaName}
                  onChange={(x) => setRegattaName(x.target.value)}
                  placeholder="Enter the name of the Regatta"
                />
                <Button
                  onClick={regattaCreationHandler}
                  className="mt-4"
                  color="primary"
                >
                  Create Regatta
                </Button>
              </div>
            </div>
          </div>
        </center>

        <div className="flex flex-col md:flex-row gap-3 flex-grow overflow-auto">
          <RegattaResponsiveCard title="Time Keepers:" onClick={addBoat}>
            <div className="h-[300px] overflow-y-auto">
              <RegattaList
                ariaLabel="List of timekeepers"
                regattas={timekeepers}
              />
            </div>
          </RegattaResponsiveCard>
          <RegattaResponsiveCard title="Boats" onClick={addBoat}>
          <div className="max-h-[300px] overflow-y-auto">
            <RegattaList ariaLabel="List of boats" regattas={boats} />
          </div>
        </RegattaResponsiveCard>
        </div>
      </AppLayout>
    </Background>
  );
}
