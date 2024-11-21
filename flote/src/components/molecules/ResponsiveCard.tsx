import AccordionCard from "@atoms/cards/AccordionCard";
import PlusButton from "@atoms/icon-buttons/PlusButton";
import StaticCard from "@atoms/cards/StaticCard";

type Props = {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
};

export default function ResponsiveCard({ title, onAdd, children }: Props) {
  const addButton = onAdd ? (
    <PlusButton ariaLabel="Create new" onClick={onAdd} />
  ) : undefined;

  return (
    <>
      <div className="w-full hidden md:block">
        <StaticCard title={title} addButton={addButton}>
          {children}
        </StaticCard>
      </div>
      <div className="w-full block md:hidden">
        <AccordionCard title={title} addButton={addButton}>
          {children}
        </AccordionCard>
      </div>
    </>
  );
}
