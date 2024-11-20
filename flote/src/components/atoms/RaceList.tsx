import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Race } from "@models/Race";

type Props = {
  ariaLabel: string;
  races: Race[];
};

// TODO: href to regatta page, remove scrollbars if no overflow
export default function RaceList({ ariaLabel, races }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>Nothing yet!</p>}
      classNames={{ list: "max-h-[400px] overflow-y-scroll" }}
    >
    {races.map((r, i) => (
        <ListboxItem key={i} href={`/race/${r._id}`}>
          {r.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
