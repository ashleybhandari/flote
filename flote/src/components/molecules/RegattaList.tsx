import { Regatta } from "@models/Regatta";

import { Card, CardBody } from "@nextui-org/card";

type Props = {
  regattas: Regatta[];
  className?: string;
};

export default function RegattaList({ regattas, className }: Props) {
  const handleSelectRegatta = (regatta: Regatta) => console.log(regatta);

  return (
    <div className={className}>
      <h2 className="font-header font-bold text-lg mb-3">your regattas</h2>
      <ul className="flex flex-row gap-3">
        {regattas.map((regatta) => (
          <Card
            shadow="sm"
            key={regatta._id}
            isPressable
            onPress={() => handleSelectRegatta(regatta)}
            className="w-40 min-h-20"
          >
            <CardBody className="flex justify-center items-center text-small">
              <b>{regatta.name}</b>
            </CardBody>
          </Card>
        ))}
      </ul>
    </div>
  );
}
