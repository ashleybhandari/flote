import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// import { socket } from "../socket";

import AccountHome from "./pages/AccountHome";
import Landing from "./pages/Landing";

const PrivateRoutes = () => {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default function App() {
  useEffect(() => {
    // TODO socket functions
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<AccountHome />} />
      </Route>
    </Routes>
  );
}
