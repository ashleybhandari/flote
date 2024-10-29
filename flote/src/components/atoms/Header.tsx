import { useAuth0 } from "@auth0/auth0-react";

import Logo from "./Logo";
import RoundedButton from "./RoundedButton";

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
      <RoundedButton
        className="text-white border-solid border-2 border-white hover:bg-white/10 active:bg-white/20"
        onClick={handleSignOut}
      >
        sign out
      </RoundedButton>
    </div>
  );
}
