import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import logo from "@assets/logo.svg";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const goToHome = () => navigate(isAuthenticated ? "/home" : "/");

  return (
    <img
      src={logo}
      alt="Logo"
      className={`w-10 cursor-pointer ${className}`}
      onClick={goToHome}
    />
  );
}
