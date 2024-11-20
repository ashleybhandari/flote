import { useParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";

export default function RaceView() {
  const { regattaId, raceId } = useParams();
  return (
    <AppLayout>
      <div>regatta id: {regattaId}</div>
      <div>race id: {raceId}</div>
    </AppLayout>
  );
}
