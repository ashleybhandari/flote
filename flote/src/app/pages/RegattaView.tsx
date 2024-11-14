import { useParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";

export default function RegattaView() {
  const { regattaId } = useParams();

  return <AppLayout>regatta id: {regattaId}</AppLayout>;
}
