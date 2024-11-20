import { useEffect, useState } from "react";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import * as classes from "./card-classes";

type Props = {
  title: string;
  subtitle?: string;
  isExpanded?: boolean;
  children: React.ReactNode;
};

export default function AccordionCard({
  title,
  subtitle,
  isExpanded = true,
  children,
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  useEffect(() => {
    setSelectedKeys(new Set(isExpanded ? ["1"] : []));
  }, [isExpanded]);

  return (
    <Accordion
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      itemClasses={{
        base: `px-5 ${classes.base}`,
        title: classes.title,
        indicator: "text-secondary text-large",
      }}
    >
      <AccordionItem
        key="1"
        aria-label={title}
        title={title}
        subtitle={subtitle}
      >
        <hr className={`-mt-3 ${classes.divider}`} />
        <div className="mt-4 mb-3">{children}</div>
      </AccordionItem>
    </Accordion>
  );
}
