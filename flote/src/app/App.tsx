import { Route, Routes } from "react-router-dom";

import { AuthenticationGuard } from "./AuthenticationGuard";

import AccountHome from "@pages/AccountHome";
import Landing from "@pages/Landing";

// TODO figure out why refresh is so slow
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="home"
        element={<AuthenticationGuard component={AccountHome} />}
      />
    </Routes>
  );
}
