import { useRef } from "react";

type Props = {
  handleSearch: (arg0: string | undefined) => void;
};

export default function SearchBar({ handleSearch }: Props) {
  const queryRef = useRef<HTMLInputElement>(null);

  const searchLogs = (event) => {
    const isKeypress = event.nativeEvent instanceof KeyboardEvent;
    if (!isKeypress || (isKeypress && event.key === "Enter")) {
      event.preventDefault();
      handleSearch(queryRef.current?.value);
    }
  };

  return (
    <div
      className="flex flex-row w-full bg-white rounded"
      onKeyDown={searchLogs}
    >
      <input
        ref={queryRef}
        className="grow py-4 pl-6 bg-transparent border-none focus:outline-none"
        placeholder="Search for a regatta, race, or participant"
      ></input>
      <button
        className="fa-solid fa-magnifying-glass pr-6 text-outline"
        onClick={searchLogs}
      ></button>
    </div>
  );
}
