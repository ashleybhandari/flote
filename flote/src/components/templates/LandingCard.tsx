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
      <div className="flex flex-col items-center gap-3 w-[600px] min-h-44 m-auto bg-white rounded pt-8 pb-10 px-2">
        <div className="font-header font-bold text-[30px]">{headerText}</div>
        <div>{children}</div>
        <RoundedButton className="mt-2" onClick={onClick}>
          {buttonText}
        </RoundedButton>
      </div>
    </LandingBackground>
  );
}
