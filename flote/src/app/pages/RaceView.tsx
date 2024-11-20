import { useParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";
import StaticCard from "@atoms/cards/StaticCard";

export default function RaceView() {
  const { regattaId, raceId } = useParams();

  const data = [
    { key: "Regatta ID", value: regattaId },
    { key: "Race ID", value: raceId },
  ];

  return (
    <AppLayout title="race name" subtitle="race">
      <StaticCard title="details">
        <ul>
          {data.map((e) => (
            <li>
              <span className="font-bold">{e.key}: </span>
              {e.value}
            </li>
          ))}
        </ul>
      </StaticCard>
    </AppLayout>
  );
}
