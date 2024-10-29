import { Regatta } from "@models/Regatta";

import RegattaListItem from "@atoms/RegattaListItem";

type Props = {
  regattas: Regatta[];
  className?: string;
};

export default function RegattaList({ regattas, className }: Props) {
  return (
    <div className={className}>
      <h2 className="font-header font-bold text-lg mb-3">your regattas</h2>
      <ul className="flex flex-col gap-2">
        {regattas.map((regatta) => (
          <RegattaListItem key={regatta.id} regatta={regatta} />
        ))}
      </ul>
    </div>
  );
}
