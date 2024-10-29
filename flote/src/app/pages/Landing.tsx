import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/atoms/Logo";
import RoundedButton from "../../components/atoms/RoundedButton";
import SearchBar from "../../components/atoms/SearchBar";

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
        <RoundedButton
          className="self-end text-lg text-white border-2 border-white hover:border-transparent active:border-transparent bg-black/40 hover:bg-primary active:bg-primary/90"
          onClick={loginWithRedirect}
        >
          sign in
        </RoundedButton>
        <div className="grow flex flex-col items-center justify-center pb-44">
          <Logo isLink={false} className="text-[96px] mb-6"></Logo>
          <SearchBar className="w-72 sm:w-96 lg:w-[600px]"></SearchBar>
        </div>
      </div>
    </div>
  );
}
