import { useEffect } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";

import { socket } from "../socket";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AccountHome from "./pages/AccountHome";

const PrivateRoutes = () => {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default function App() {
  useEffect(() => {
    socket.on("getUser", (data) => console.log(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<AccountHome />} />
      </Route>
    </Routes>
  );
}
