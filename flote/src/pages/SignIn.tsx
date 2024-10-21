import LandingCard from "../components/templates/LandingCard";

export default function SignIn() {
  const handleClick = () => console.log('clicked!');

  return (
    <LandingCard
      headerText="Welcome back!"
      buttonText="Sign in"
      onClick={handleClick}
    ></LandingCard>
  );
}
