import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Boat } from "@models/Boat";

type Props = {
  ariaLabel: string;
  boats: Boat[];
};

export default function BoatList({ ariaLabel, boats }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>No boats available yet!</p>}
    >
      {boats.map((boat, i) => (
        <ListboxItem
          key={i}
          href={`/regatta/${boat.regattaId}/boat/${boat._id}`}
          textValue={boat.name}
        >
          {boat.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}