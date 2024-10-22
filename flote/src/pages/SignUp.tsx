import { Link } from "react-router-dom";

import LandingCard from "../components/templates/LandingCard";

export default function SignUp() {
  const handleClick = () => console.log("create account clicked!");

  return (
    <LandingCard
      headerText="Let's get started"
      buttonText="create account"
      onClick={handleClick}
    >
      <div>
        Already have an account?{" "}
        <Link className="text-link hover:underline" to="/sign-in">
          Sign in
        </Link>
      </div>
    </LandingCard>
  );
}
