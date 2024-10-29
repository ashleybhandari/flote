import { useAuth0 } from "@auth0/auth0-react";

import Logo from "./Logo";
import OutlinedButton from "../molecules/OutlinedButton";

export default function Header() {
  const { logout } = useAuth0();

  const handleSignOut = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="bg-secondary flex flex-row items-center justify-between py-5 px-6 md:px-10">
      <Logo className="text-[35px]"></Logo>
      <OutlinedButton onClick={handleSignOut}>sign out</OutlinedButton>
    </div>
  );
}
