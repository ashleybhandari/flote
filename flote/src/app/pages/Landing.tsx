import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";
import Logo from "@atoms/Logo";
import SearchBar from "@atoms/SearchBar";

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
        <Button
          variant="bordered"
          size="lg"
          radius="full"
          onPress={() => loginWithRedirect()}
          className="self-end w-32 text-white bg-black/40"
        >
          sign in
        </Button>
        <div className="grow flex flex-col items-center justify-center pb-44">
          <Logo isLink={false} className="text-[96px] mb-6"></Logo>
          <SearchBar className="w-72 sm:w-96 lg:w-[600px]"></SearchBar>
        </div>
      </div>
    </div>
  );
}
