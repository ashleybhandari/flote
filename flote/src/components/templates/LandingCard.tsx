import { Link } from "react-router-dom";
import LandingBackground from "./LandingBackground";

export default function LandingCard({ headerText, buttonText, onClick, children }) {
  return (
    <LandingBackground className="flex flex-col">
      <Link to="/" className="">
        <h1 className="font-header font-bold text-white text-center text-[40px]">
          flotE
        </h1>
      </Link>
      <div className="flex flex-col items-center w-[600px] min-h-44 m-auto bg-white rounded">
        <div className="font-header font-bold text-[30px] mt-8">{headerText}</div>
        <div>{children}</div>
        <button onClick={onClick}>{buttonText}</button>
      </div>
    </LandingBackground>
  );
}
