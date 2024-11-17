import { Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from "./AuthenticationGuard";

import AccountHome from "@pages/AccountHome";
import Landing from "@pages/Landing";
import RaceTimer from "@pages/RaceTimer/RaceTimer";

// TODO figure out why refresh is so slow
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="home"
        element={<AuthenticationGuard component={AccountHome} />}
      />
      <Route
        path="raceTimer"
        element={<RaceTimer />}
      />
    </Routes>
  );
}
