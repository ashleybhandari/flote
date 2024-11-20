import { useParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";

export default function RaceView() {
  const { regattaId, raceId } = useParams();
  return (
    <AppLayout title="race name" subtitle="race">
      <div>regatta id: {regattaId}</div>
      <div>race id: {raceId}</div>
    </AppLayout>
  );
}
