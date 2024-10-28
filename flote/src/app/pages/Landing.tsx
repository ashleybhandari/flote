import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/atoms/Logo";
import SearchBar from "../../components/atoms/SearchBar";
import SolidButton from "../../components/molecules/SolidButton";

export default function Landing() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <div className="bg-landing bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen">
      <div className="backdrop-blur-[2px] p-6 h-screen w-screen flex flex-col">
        <SolidButton className="self-end text-lg" onClick={loginWithRedirect}>
          sign up
        </SolidButton>
        <div className="grow flex flex-col items-center justify-center pb-44">
          <Logo className="text-[96px] mb-4"></Logo>
          <div className="w-72 sm:w-96 md:w-[550px]">
            <SearchBar handleSearch={console.log}></SearchBar>
          </div>
        </div>
      </div>
    </div>
  );
}
