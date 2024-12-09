import { Boat } from "@models/Boat";
import { Race } from "@models/Race";
import { Regatta } from "@models/Regatta";

import { Listbox, ListboxItem } from "@nextui-org/listbox";

type Props = {
  ariaLabel: string;
  itemType: "regatta" | "race" | "boat" | "timekeeper";
  items: Regatta[] | Race[] | Boat[] | string[];
  emptyContent?: string;
};

export default function List({
  ariaLabel,
  itemType,
  items,
  emptyContent,
}: Props) {
  return (
    <div className="flex flex-col">
      <Listbox
        aria-label={ariaLabel}
        emptyContent={<p className="italic text-center">{emptyContent ?? "Nothing yet!"}</p>}
        classNames={{ list: "max-h-[400px] overflow-y-auto" }}
      >
        {items.map((e, i) => {
          let href = "";
          let isDisabled = false;

          if (itemType === "regatta") href = `/regatta/${e._id}`;
          if (itemType === "race")
            href = `/regatta/${e.regattaId}/race/${e._id}`;
          if (itemType === "boat")
            href = `/regatta/${e.regattaId}/boat/${e._id}`;
            if (location.pathname === "/regatta/create") {
              isDisabled = true;
            }

          return (
            <ListboxItem
              key={i}
              // updated so when we're on the create page the user cannot access the boat page
              href={isDisabled ? undefined : href}
            >
              {e?.name ?? e}
            </ListboxItem>
          );
        })}
      </Listbox>
    </div>
  );
}
