import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import AccountHome from "@pages/AccountHome";
import Landing from "@pages/Landing";

export default function App() {
  const { isAuthenticated } = useAuth0();

  const PrivateRoutes = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<PrivateRoutes />}>
        <Route path="home" element={<AccountHome />} />
      </Route>
    </Routes>
  );
}
