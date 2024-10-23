import { Link } from "react-router-dom";

import LandingCard from "../../components/templates/LandingCard";

export default function SignIn() {
  const handleClick = () => console.log("sign in clicked!");

  return (
    <LandingCard
      headerText="Welcome back!"
      buttonText="sign in"
      onClick={handleClick}
    >
      <div>
        Don't have an account?{" "}
        <Link className="text-link hover:underline" to="/sign-up">
          Sign up
        </Link>
      </div>
    </LandingCard>
  );
}
