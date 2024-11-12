import { Accordion, AccordionItem } from "@nextui-org/accordion";
import * as classes from "./card-classes";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function AccordionCard({ title, children }: Props) {
  return (
    <Accordion
      defaultExpandedKeys={["1"]}
      itemClasses={{
        base: `px-5 ${classes.base}`,
        title: classes.title,
        indicator: "text-secondary text-large",
      }}
    >
      <AccordionItem key="1" aria-label={title} title={title}>
        <hr className={`-mt-3 ${classes.divider}`} />
        <div className="mt-4 mb-3">{children}</div>
      </AccordionItem>
    </Accordion>
  );
}
