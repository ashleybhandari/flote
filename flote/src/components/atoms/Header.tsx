import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "@nextui-org/button";
import Logo from "@atoms/Logo";

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
      <Button
        variant="bordered"
        size="lg"
        radius="full"
        onPress={() => handleSignOut()}
        className="self-end w-32 text-white"
      >
        sign out
      </Button>
    </div>
  );
}
