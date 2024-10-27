import { useNavigate } from "react-router-dom";

import OutlinedButton from "../../components/molecules/OutlinedButton";

export default function AccountHome() {
  const navigate = useNavigate();
  const handleSignOut = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="mb-10 font-header font-bold text-[30px]">Home</div>
      <OutlinedButton onClick={handleSignOut}>
        sign out
      </OutlinedButton>
    </div>
  );
}
