import HeaderProfile from "@atoms/HeaderProfile";
import SearchBar from "@atoms/SearchBar";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  return (
    <div
      className={`mt-5 flex gap-6 flex-col md:flex-row justify-between items-center ${className}`}
    >
      <HeaderProfile />
      <SearchBar className="w-80 sm:w-[380px] drop-shadow" />
    </div>
  );
}
