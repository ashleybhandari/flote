import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";

type Props = {
  size?: "sm" | "lg";
  className?: string;
};

export default function SearchBar({ size = "sm", className }: Props) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const queryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const isKeypress = event.nativeEvent instanceof KeyboardEvent;
    if (!isKeypress || (isKeypress && event.key === "Enter")) {
      event.preventDefault();
      const query = queryRef.current?.value ?? "";
      if (query) {
        queryRef.current?.blur();
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className={className}>
      <div
        className="flex flex-row w-full bg-white rounded"
        onKeyDown={handleSearch}
      >
        <input
          ref={queryRef}
          className={`grow bg-transparent border-none focus:outline-none ${
            size === "sm" ? "py-2 pl-4" : "py-4 pl-6"
          }`}
          placeholder="Search for a regatta, race, or participant"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button
          className={`fa-solid fa-magnifying-glass text-slate-600 pl-2 ${
            size === "sm" ? "pr-4" : "pr-6"
          }`}
          onClick={handleSearch}
        ></button>
      </div>
    </div>
  );
}
