import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/atoms/Logo";
import RoundedButton from "../components/atoms/RoundedButton";
import LandingBackground from "../components/templates/LandingBackground";

export default function Landing() {
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const goToSignIn = () => navigate("sign-in");
  const searchLogs = (event) => {
    if (!event || event.key === "Enter") {
      event?.preventDefault();
      console.log("search query:", queryRef.current?.value);
    }
  };

  return (
    <LandingBackground className="flex flex-col">
      <RoundedButton fontSize="lg" className="self-end" onClick={goToSignIn}>
        sign in
      </RoundedButton>
      <div className="self-center text-center m-auto pb-44">
        <Logo fontSizePx="96" className="mb-4"></Logo>
        <div
          className="flex flex-row w-72 sm:w-96 md:w-[550px] bg-white rounded"
          onKeyDown={(e) => searchLogs(e)}
        >
          <input
            ref={queryRef}
            className="grow py-4 pl-6 bg-transparent border-none focus:outline-none"
            placeholder="search for a regatta, race, or participant"
          ></input>
          <button
            className="fa-solid fa-magnifying-glass pr-6 text-outline"
            onClick={searchLogs}
          ></button>
        </div>
      </div>
    </LandingBackground>
  );
}
