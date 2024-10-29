import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/atoms/Logo";
import SearchBar from "../../components/atoms/SearchBar";
import SolidButton from "../../components/molecules/SolidButton";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  // TODO remove, change redirect_uri to /home
  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-landing bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen">
      <div className="backdrop-blur-[2px] p-6 h-screen w-screen flex flex-col">
        <SolidButton
          className="self-end text-lg border-2 border-white hover:text-black active:text-black hover:bg-white active:bg-slate-100"
          onClick={loginWithRedirect}
        >
          sign in
        </SolidButton>
        <div className="grow flex flex-col items-center justify-center pb-44">
          <Logo isLink={false} className="text-[96px] mb-6"></Logo>
          <SearchBar className="w-72 sm:w-96 lg:w-[600px]"></SearchBar>
        </div>
      </div>
    </div>
  );
}
