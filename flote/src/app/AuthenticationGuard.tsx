import { withAuthenticationRequired } from "@auth0/auth0-react";

import PageSpinner from "@src/components/atoms/PageSpinner";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageSpinner />,
  });

  return <Component />;
};
