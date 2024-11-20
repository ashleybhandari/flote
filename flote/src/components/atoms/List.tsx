import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Regatta } from "@models/Regatta";
import { Race } from "@models/Race";

type Props = {
  ariaLabel: string;
  itemType: "regatta" | "race";
  items: Regatta[] | Race[];
};

export default function List({ ariaLabel, itemType, items }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>Nothing yet!</p>}
      classNames={{ list: "max-h-[400px] overflow-y-auto" }}
    >
      {items.map((e, i) => {
        let href = `/regatta/${e._id}`;
        if (itemType === "race") href = `/regatta/${e.regattaId}/race/${e._id}`;
        return (
          <ListboxItem key={i} href={href}>
            {e.name}
          </ListboxItem>
        );
      })}
    </Listbox>
  );
}
