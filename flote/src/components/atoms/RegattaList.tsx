import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { Regatta } from "@models/Regatta";

type Props = {
  ariaLabel: string;
  regattas: Regatta[];
};

// TODO: href to regatta page, remove scrollbars if no overflow
export default function RegattaList({ ariaLabel, regattas }: Props) {
  return (
    <Listbox
      aria-label={ariaLabel}
      emptyContent={<p>Nothing yet!</p>}
      classNames={{ list: "max-h-[400px] overflow-y-scroll" }}
    >
      {regattas.map((r, i) => (
        <ListboxItem key={i} href="/home">
          {r.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}
