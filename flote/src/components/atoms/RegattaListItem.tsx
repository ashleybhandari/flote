import { Regatta } from "../../types/Regatta";

type Props = {
  regatta: Regatta;
  className?: string;
};

export default function RegattaListItem({ regatta }: Props) {
  const handleSelectRegatta = () => {
    console.log(regatta);
    // TODO navigate to regatta page
  };

  return (
    <li
      className="text-link cursor-pointer hover:underline w-fit"
      onClick={handleSelectRegatta}
    >
      {regatta.name}
    </li>
  );
}
