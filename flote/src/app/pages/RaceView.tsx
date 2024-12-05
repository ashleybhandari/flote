import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLayout from "@templates/AppLayout";
import List from "@atoms/List";
import ResponsiveCard from "@molecules/ResponsiveCard";
// import StaticCard from "@atoms/cards/StaticCard";

import { Boat } from "@models/Boat";

import { socket } from "@src/socket";
import { EventResponse } from "@src/models/EventResponse";

export default function RaceView() {
  const { raceId } = useParams();
  const location = useLocation();

  const [raceName, setRaceName] = useState<string>("");
  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    if (location.state?.race?.name) {
      setRaceName(location.state.race.name);
    } else if (raceId) {
      socket.emit("getRaceById", raceId, (res: EventResponse) => {
        if (res.error) {
          console.error("Failed to fetch race details:", res.error);
        } else {
          setRaceName(res.data.race.name);
          setBoats(res.data.boats);
        }
      });
    }
  }, [raceId, location.state]);

  return (
    <AppLayout title={raceName} subtitle="race" className="flex">
      <div className="grow flex flex-col lg:flex-row gap-3">
        <ResponsiveCard title="Boats in Race">
          <ul aria-label="List of boats" className="list-disc pl-5">
            {boats.length > 0 ? (
              boats.map((boat) => (
                <li key={boat._id} className="py-1">
                  {boat.name}
                </li>
              ))
            ) : (
              <li>No available boats</li>
            )}
          </ul>
        </ResponsiveCard>
      </div>
    </AppLayout>
  );
}

//   return (
//     <AppLayout title={raceName} subtitle="race" className="flex">
//       <div className="grow flex flex-col lg:flex-row gap-3">
//         <ResponsiveCard title="Boats in Race">
//           <List ariaLabel="List of boats" itemType="boat" items={boats} />
//         </ResponsiveCard>
//       </div>
//     </AppLayout>
//   );
// }

//   return (
//     <AppLayout title={raceName} subtitle="regatta" className="flex">
//       <div className="grow flex flex-col lg:flex-row gap-3">
//         <ResponsiveCard title="Boats">
//           <List ariaLabel="List of boats" itemType="boat" items={boats} />
//         </ResponsiveCard>
//         <ResponsiveCard title="Races">
//           <List ariaLabel="List of races" itemType="race" items={["races"]} />
//         </ResponsiveCard>
//         <ResponsiveCard title="Timekeepers">
//           <List
//             ariaLabel="Timekeepers"
//             itemType="timekeeper"
//             items={["timekeeper"]} //Temp
//           />
//         </ResponsiveCard>
//       </div>
//     </AppLayout>
//   );
// }

  // return (
  //   <AppLayout title={raceName} subtitle="race" className="flex">
  //     <div className="grow flex flex-col lg:flex-row gap-3">
  //       <ResponsiveCard title="Boats in Race">
  //         <List ariaLabel="List of boats" itemType="boat" items={boats} />
  //       </ResponsiveCard>
  //     </div>
  //   </AppLayout>
  // );

  // return (
  //   <AppLayout title="race name" subtitle="race">
  //     <StaticCard title="details">
  //       <ul>
  //         {data.map((e, i) => (
  //           <li key={i}>
  //             <span className="font-bold">{e.key}: </span>
  //             {e.value}
  //           </li>
  //         ))}
  //       </ul>
  //     </StaticCard>
  //   </AppLayout>
  // );
// }
