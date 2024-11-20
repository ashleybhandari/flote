import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";

import { Boat } from "@models/Boat";

import StaticCard from "@atoms/cards/StaticCard";
import AppLayout from "@templates/AppLayout";

export default function RegattaView() {
  const { regattaId, boatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);

  useEffect(() => {
    if (location.state?.boat) {
      setBoat(location.state.boat);
    } else if (boatId) {
      socket.emit("getBoats", regattaId, (res) => {
        if (res.error) {
          console.error("Failed to fetch boats:", res.error);
        } else {
          const fetchedBoat = res.data.boats.find((b) => b._id === boatId);
          setBoat(fetchedBoat || null);
        }
      });
    }
  }, [boatId, regattaId, location.state]);

  if (!boat) return <div>Loading...</div>;

  return (
    <AppLayout title={boat.name} subtitle="boat">
      <StaticCard title="Boat Details">
        <ul>
          <li>
            <span className="font-bold">ID:</span> {boat._id}
          </li>
          <li>
            <span className="font-bold">Name:</span> {boat.name}
          </li>
          <li>
            <span className="font-bold">Participants:</span>{" "}
            {boat.participantNames.join(", ")}
          </li>
          <li>
            <span className="font-bold">Registration ID:</span>{" "}
            {boat.registrationId}
          </li>
          <li>
            <span className="font-bold">Regatta ID:</span> {boat.regattaId}
          </li>
        </ul>
      </StaticCard>
    </AppLayout>
  );
}
