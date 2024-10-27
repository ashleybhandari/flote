import { Link } from "react-router-dom";

import LandingCard from "../../components/templates/LandingCard";
import Input from "../../components/atoms/Input";

export default function SignUp() {
  const handleClick = () => console.log("create account clicked!");

  return (
    <LandingCard
      headerText="Let's get started"
      buttonText="continue"
      onClick={handleClick}
    >
      <div>
        Already have an account?{" "}
        <Link className="text-link hover:underline" to="/sign-in">
          Sign in.
        </Link>
      </div>
      <div className="flex flex-col gap-4 my-9">
        <Input label="First Name"></Input>
        <Input label="Last Name"></Input>
      </div>
    </LandingCard>
  );
}
