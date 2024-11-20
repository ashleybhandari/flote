import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";

import { Boat } from "@models/Boat";

import AppLayout from "@templates/AppLayout";
import PageSpinner from "@src/components/atoms/PageSpinner";
import StaticCard from "@atoms/cards/StaticCard";

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

  if (!boat) return <PageSpinner />;

  const data = [
    { key: "ID", value: boat._id },
    { key: "Name", value: boat.name },
    { key: "Participants", value: boat.participantNames.join(", ") },
    { key: "Registration ID", value: boat.registrationId },
    { key: "Regatta ID", value: boat.regattaId },
  ];
  return (
    <AppLayout title={boat.name} subtitle="boat">
      <StaticCard title="details">
        <ul>
          {data.map((e, i) => (
            <li key={i}>
              <span className="font-bold">{e.key}: </span>
              {e.value}
            </li>
          ))}
        </ul>
      </StaticCard>
    </AppLayout>
  );
}
