import { useRef } from "react";

type Props = {
  className?: string;
};

export default function SearchBar({ className }: Props) {
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
          className="grow py-4 pl-6 bg-transparent border-none focus:outline-none"
          placeholder="Search for a regatta, race, or participant"
        ></input>
        <button
          className="fa-solid fa-magnifying-glass pr-6 text-outline"
          onClick={handleSearch}
        ></button>
      </div>
    </div>
  );
}
