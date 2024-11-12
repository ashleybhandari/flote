import { useAuth0 } from "@auth0/auth0-react";

import { Avatar } from "@nextui-org/avatar";

export default function HeaderProfile() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  let welcomeMessage;
  let handleClick;

  const handleSignOut = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated) {
    welcomeMessage = `Hi, ${user?.nickname}!`;
    handleClick = handleSignOut;
  } else {
    welcomeMessage = "Welcome!";
    handleClick = loginWithRedirect;
  }

  return (
    <div className="flex flex-row gap-3">
      <Avatar color="primary" />
      <div>
        <h2 className="font-bold -mb-1">{welcomeMessage}</h2>
        <button
          className="hover:text-secondary"
          onClick={async () => handleClick()}
        >
          sign {isAuthenticated ? "out" : "in"}
        </button>
      </div>
    </div>
  );
}
