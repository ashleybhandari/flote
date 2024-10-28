import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import OutlinedButton from "../../components/molecules/OutlinedButton";

export default function AccountHome() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
  const handleSignOut = async () =>{
	  await logout({ logoutParams: { returnTo: window.location.origin }}); 
	  navigate("/");
	  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="mb-10 font-header font-bold text-[30px]">Home</div>
      <OutlinedButton onClick={handleSignOut}>
        sign out
      </OutlinedButton>
    </div>
  );
}
