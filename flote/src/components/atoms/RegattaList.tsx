import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Regatta } from "@models/Regatta";
import { Boat } from "@models/Boat";

type Props = {
  ariaLabel: string;
  regattas: Regatta[] | Boat[];
};

export default function RegattaList({ ariaLabel, regattas }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>Nothing yet!</p>}
      classNames={{ list: "max-h-[400px] overflow-y-auto" }}
    >
      {regattas.map((r, i) => (
        <ListboxItem key={i} href={`/regatta/${r._id}`}>
          {r.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
