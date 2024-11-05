import { useRef } from "react";

type Props = {
  size?: "sm" | "lg";
  className?: string;
};

export default function SearchBar({ size = "sm", className }: Props) {
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event) => {
    const isKeypress = event.nativeEvent instanceof KeyboardEvent;
    if (!isKeypress || (isKeypress && event.key === "Enter")) {
      event.preventDefault();
      console.log(queryRef.current?.value);
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
