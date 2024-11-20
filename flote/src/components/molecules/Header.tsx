import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HeaderProfile from "@atoms/HeaderProfile";
import SearchBar from "@atoms/SearchBar";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { user } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  const isAccountHomePage = location.pathname === "/home";

  return (
    <div
      className={`mt-5 flex gap-6 flex-col md:flex-row justify-between items-center ${className}`}
    >
      <HeaderProfile />
      
      <div className="flex flex-row gap-4 items-center">
        {user && isAccountHomePage && (
          <button
            className="py-2 px-4 bg-primary text-white rounded"
            onClick={() => navigate('/regatta/create')}
          >
            Create
          </button>
        )}
        
        <SearchBar className="w-80 sm:w-[380px] drop-shadow" />
      </div>
    </div>
  );
}