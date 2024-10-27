import { Link, useNavigate } from "react-router-dom";

import LandingCard from "../../components/templates/LandingCard";

export default function SignIn() {
  const navigate = useNavigate();
  const handleSignIn = () => navigate("/home");

  return (
    <LandingCard
      headerText="Welcome back!"
      buttonText="sign in"
      onClick={handleSignIn}
    >
      <div className="text-slate-600">
        Don't have an account?{" "}
        <Link className="text-link hover:underline" to="/sign-up">
          Sign up.
        </Link>
      </div>
    </LandingCard>
  );
}
