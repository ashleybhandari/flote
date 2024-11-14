import AccordionCard from "@atoms/cards/AccordionCard";
import StaticCard from "@atoms/cards/StaticCard";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ResponsiveCard({ title, children }: Props) {
  return (
    <>
      <div className="w-full hidden md:block">
        <StaticCard title={title}>{children}</StaticCard>
      </div>
      <div className="w-full block md:hidden">
        <AccordionCard title={title}>{children}</AccordionCard>
      </div>
    </>
  );
}
