import Logo from "./Logo";
import OutlinedButton from "../molecules/OutlinedButton";

export default function Header() {
  const handleSignOut = () => {
    console.log("sign out clicked");
  };
  
  return (
    <div className="bg-secondary flex flex-row items-center justify-between py-5 px-6 md:px-10">
      <Logo className="text-[35px]"></Logo>
      <OutlinedButton onClick={handleSignOut}>sign out</OutlinedButton>
    </div>
  );
}
