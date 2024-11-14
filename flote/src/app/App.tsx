import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";

import { AuthenticationGuard } from "./AuthenticationGuard";

import AccountHome from "@pages/AccountHome";
import Landing from "@pages/Landing";
import RegattaView from "@src/app/pages/RegattaView";

// TODO figure out why refresh is so slow
export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="home"
          element={<AuthenticationGuard component={AccountHome} />}
        />
        <Route
          path="regatta/:regattaId"
          element={<AuthenticationGuard component={RegattaView} />}
        />
      </Routes>
    </NextUIProvider>
  );
}
