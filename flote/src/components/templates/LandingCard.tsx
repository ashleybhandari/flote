import { useNavigate } from "react-router-dom";

import LandingBackground from "./LandingBackground";
import Logo from "../atoms/Logo";
import RoundedButton from "../atoms/RoundedButton";

type Props = {
  headerText: string;
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function LandingCard({
  headerText,
  buttonText,
  onClick,
  children,
}: Props) {
  const navigate = useNavigate();
  const goToLanding = () => navigate("/");

  return (
    <LandingBackground className="flex flex-col">
      <Logo className="text-[40px]" onClick={goToLanding}></Logo>
      <div className="flex flex-col items-center gap-1 w-[380px] sm:w-[600px] min-h-44 m-auto bg-white rounded px-1 pt-2 pb-10">
        <button
          className="self-start flex flex-row items-center px-4 py-2 mb-2 rounded-full hover:bg-secondary/20 active:bg-secondary/30"
          onClick={goToLanding}
        >
          <i className="fa-solid fa-arrow-left text-[9px] pr-2"></i>
          <span className="text-sm">home</span>
        </button>
        <div className="font-header font-bold text-[30px]">{headerText}</div>
        <div className="flex flex-col items-center">{children}</div>
        <RoundedButton onClick={onClick}>{buttonText}</RoundedButton>
      </div>
    </LandingBackground>
  );
}
