import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";
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

  return (
    <AppLayout>
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary opacity-50 rounded-lg"></div>

        <div className="relative flex items-baseline space-x-4">
          <h1 className="text-7xl font-bold text-white leading-tight">{boat.name}</h1>
          <span className="text-2xl font-medium text-white uppercase">BOAT</span>
        </div>
      </div>

      <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Boat Details</h2>
        <p><strong>ID:</strong> {boat._id}</p>
        <p><strong>Name:</strong> {boat.name}</p>
        <p><strong>Participants:</strong> {boat.participantNames.join(", ")}</p>
        <p><strong>Registration ID:</strong> {boat.registrationId}</p>
        <p><strong>Regatta ID:</strong> {boat.regattaId}</p>

        {/* Back Button Below Details */}
        <button
          onClick={() => navigate(`/regatta/${regattaId}`)} // Navigate to the regatta page
          className="mt-6 p-2 bg-primary text-white rounded-lg shadow-md"
        >
          Back to Regatta
        </button>
      </div>
    </AppLayout>
  );
}
