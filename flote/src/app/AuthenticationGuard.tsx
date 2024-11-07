import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Spinner } from "@nextui-org/react";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Spinner size="lg" className="w-screen h-screen" />,
  });

  return <Component />;
};
