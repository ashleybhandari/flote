import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Boat } from "@models/Boat";
import { Race } from "@models/Race";
import { Regatta } from "@models/Regatta";

type Props = {
  ariaLabel: string;
  itemType: "regatta" | "race" | "boat" | "timekeeper";
  items: Regatta[] | Race[] | Boat[] | string[];
};

export default function List({ ariaLabel, itemType, items }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>Nothing yet!</p>}
      classNames={{ list: "max-h-[400px] overflow-y-auto" }}
    >
      {items.map((e, i) => {
        let href = "";

        if (itemType === "regatta") href = `/regatta/${e._id}`;
        if (itemType === "race") href = `/regatta/${e.regattaId}/race/${e._id}`;
        if (itemType === "boat") href = `/regatta/${e.regattaId}/boat/${e._id}`;

        return (
          <ListboxItem key={i} href={href}>
            {e?.name ?? e}
          </ListboxItem>
        );
      })}
    </Listbox>
  );
}
