import LandingCard from "../components/templates/LandingCard";

export default function SignIn() {
  const handleClick = () => console.log("sign in clicked!");

  return (
    <LandingCard
      headerText="Welcome back!"
      buttonText="sign in"
      onClick={handleClick}
    >
      content...
    </LandingCard>
  );
}
