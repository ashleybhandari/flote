import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "@src/socket";

import { Boat } from "@models/Boat";

import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";
// import StaticCard from "@atoms/cards/StaticCard";
import { EventResponse } from "@src/models/EventResponse";
// import PageSpinner from "@src/components/atoms/PageSpinner";




export default function BoatView() {
  const { boatId } = useParams();
  const [raceName, setRaceName] = useState<string>("");
  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    if (boatId) {
      socket.emit("getBoatById", boatId, (res: EventResponse) => {
        if (res.error) {
          console.error("Failed to fetch boat details:", res.error);
        } else {
          setRaceName(res.data.race.name);
          setBoats(res.data.boats);
        }
      });
    }
  }, [boatId]);

  return (
    <AppLayout title={raceName} subtitle="race" className="flex">
      <div className="grow flex flex-col lg:flex-row gap-3">
        <ResponsiveCard title="Boats">
          <List ariaLabel="List of boats" itemType="boat" items={boats} />
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}









// export default function BoatView() {
//   const { regattaId, boatId } = useParams();
//   const location = useLocation();
//   // const navigate = useNavigate();
//   const [boat, setBoat] = useState<Boat | null>(null);

//   useEffect(() => {
//     if (location.state?.boat) {
//       setBoat(location.state.boat);
//     } else if (boatId) {
//       socket.emit("getBoats", regattaId, (res: EventResponse) => {
//         if (res.error) {
//           console.error("Failed to fetch boats:", res.error);
//         } else {
//           const fetchedBoat = res.data.boats.find((b: Boat) => b._id === boatId);
//           setBoat(fetchedBoat || null);
//         }
//       });
//     }
//   }, [boatId, regattaId, location.state]);

//   if (!boat) return {PageSpinner};

//   const data = [
//     { key: "ID", value: boat._id },
//     { key: "Name", value: boat.name },
//     { key: "Participants", value: boat.participantNames.join(", ") },
//     { key: "Registration ID", value: boat.registrationId },
//     { key: "Regatta ID", value: boat.regattaId },
//   ];
//   return (
//     <AppLayout title={boat.name} subtitle="boat">
//       <StaticCard title="details">
//         <ul>
//           {data.map((e, i) => (
//             <li key={i}>
//               <span className="font-bold">{e.key}: </span>
//               {e.value}
//             </li>
//           ))}
//         </ul>
//       </StaticCard>
//     </AppLayout>
//   );
// }
