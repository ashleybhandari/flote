import { useParams } from "react-router-dom";

export default function Regatta() {
  const { regattaId } = useParams();

  return <div>regatta id: {regattaId}</div>;
}
