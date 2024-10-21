import { Link } from "react-router-dom";
import LandingBackground from "./LandingBackground";

export default function Landing() {
  return (
    <LandingBackground className="flex flex-col">
      <button className="self-end w-fit mt-6 mr-6 px-9 py-2 rounded text-white text-lg bg-primary/90 hover:bg-primary/70 active:bg-primary/80">
        <Link to="sign-in">Sign in</Link>
      </button>
      <div className="self-center text-center mt-28">
        <div className="mb-4 font-header font-bold text-white text-[96px]">
          flotE
        </div>
        <form className="flex flex-row w-72 sm:w-96 md:w-[550px] bg-white rounded">
          <input
            className="grow py-4 pl-6 bg-transparent border-none focus:outline-none"
            placeholder="Search for a regatta, race, or participant"
          ></input>
          <button className="fa-solid fa-magnifying-glass pr-6 text-outline"></button>
        </form>
      </div>
    </LandingBackground>
  );
}
