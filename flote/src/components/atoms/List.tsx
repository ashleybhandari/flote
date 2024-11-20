import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Boat } from "@models/Boat";
import { Race } from "@models/Race";
import { Regatta } from "@models/Regatta";
import { Button } from "@nextui-org/react";

type Props = {
  ariaLabel: string;
  itemType: "regatta" | "race" | "boat" | "timekeeper";
  items: Regatta[] | Race[] | Boat[] | string[];
  onAdd?: () => void;
};

export default function List({ ariaLabel, itemType, items, onAdd }: Props) {
  return (
    <div className="flex flex-col">
      <Listbox
        aria-label={ariaLabel}
        emptyContent={<p>Nothing yet!</p>}
        classNames={{ list: "max-h-[400px] overflow-y-auto" }}
      >
        {items.map((e, i) => {
          let href = "";

          if (itemType === "regatta") href = `/regatta/${e._id}`;
          if (itemType === "race")
            href = `/regatta/${e.regattaId}/race/${e._id}`;
          if (itemType === "boat")
            href = `/regatta/${e.regattaId}/boat/${e._id}`;

          return (
            <ListboxItem key={i} href={href}>
              {e?.name ?? e}
            </ListboxItem>
          );
        })}
      </Listbox>
      {onAdd && (
        <Button
          isIconOnly
          color="secondary"
          radius="full"
          className="self-end"
          onPress={onAdd}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      )}
    </div>
  );
}
