import { Link, useNavigate } from "react-router-dom";

import LandingCard from "../../components/templates/LandingCard";
import Input from "../../components/molecules/Input";

export default function SignUp() {
  const navigate = useNavigate();
  const handleSignUp = () => navigate("/home");

  return (
    <LandingCard
      headerText="Let's get started"
      buttonText="continue"
      onClick={handleSignUp}
    >
      <div className="text-slate-600">
        Already have an account?{" "}
        <Link className="text-link hover:underline" to="/sign-in">
          Sign in.
        </Link>
      </div>
      <div className="flex flex-col mt-9 mb-2">
        <Input label="First Name"></Input>
        <Input label="Last Name"></Input>
      </div>
    </LandingCard>
  );
}
