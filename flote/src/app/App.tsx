import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";

import { AuthenticationGuard } from "./AuthenticationGuard";

import AccountHome from "@pages/AccountHome";
import Landing from "@pages/Landing";
import RegattaView from "@pages/RegattaView";
import Search from "@pages/Search";

// TODO figure out why refresh is so slow
export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="home"
          element={<AuthenticationGuard component={AccountHome} />}
        />
        <Route path="regatta/:regattaId" element={<RegattaView />} />
      </Routes>
    </NextUIProvider>
  );
}
