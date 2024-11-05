import { useAuth0 } from "@auth0/auth0-react";

import { Avatar } from "@nextui-org/react";

export default function HeaderProfile() {
  const { user, logout } = useAuth0();

  const handleSignOut = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex flex-row gap-3">
      <Avatar color="primary" />
      <div>
        <h2 className="font-bold -mb-1">Hi, {user?.nickname}!</h2>
        <button className="hover:text-secondary" onClick={handleSignOut}>
          sign out
        </button>
      </div>
    </div>
  );
}
