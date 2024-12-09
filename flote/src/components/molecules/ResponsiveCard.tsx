import AccordionCard from "@atoms/cards/AccordionCard";
import ActionButton from "@atoms/icon-buttons/ActionButton";
import StaticCard from "@atoms/cards/StaticCard";

type Props = {
  title: string;
  action?: "add" | "edit";
  onAction?: () => void;
  children: React.ReactNode;
};

export default function ResponsiveCard({
  title,
  action,
  onAction,
  children,
}: Props) {
  const actionButton =
    action && onAction ? (
      <ActionButton
        isAdding={action === "add"}
        onAction={onAction}
      ></ActionButton>
    ) : undefined;

  return (
    <>
      <div className="w-full hidden md:block">
        <StaticCard title={title} actionButton={actionButton}>
          {children}
        </StaticCard>
      </div>
      <div className="w-full block md:hidden">
        <AccordionCard title={title} actionButton={actionButton}>
          {children}
        </AccordionCard>
      </div>
    </>
  );
}
