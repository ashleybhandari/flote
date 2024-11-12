import { useParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";

export default function Regatta() {
  const { regattaId } = useParams();

  return <AppLayout>regatta id: {regattaId}</AppLayout>;
}
