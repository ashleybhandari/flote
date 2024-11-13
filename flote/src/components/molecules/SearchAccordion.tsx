import AccordionCard from "@atoms/cards/AccordionCard";

type Props = {
  title: string;
  searchQuery: string;
};

export default function SearchAccordion({ title, searchQuery }: Props) {
  return <AccordionCard title={title}>
    <div>{searchQuery}</div>
  </AccordionCard>;
}
