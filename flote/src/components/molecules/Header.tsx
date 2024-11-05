import HeaderProfile from "@atoms/HeaderProfile";
import SearchBar from "@atoms/SearchBar";

export default function Header() {
  return (
    <div className="mx-7 mt-5 flex gap-6 flex-col md:flex-row justify-between items-center">
      <HeaderProfile />
      <SearchBar className="w-80 sm:w-[380px] drop-shadow" />
    </div>
  );
}
