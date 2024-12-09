import { Button } from "@nextui-org/button";

type Props = {
  isAdding: boolean;
  onAction: () => void;
};

export default function ActionButton({ isAdding, onAction }: Props) {
  return (
    <div className="text-end mb-3 md:mb-1">
      <Button
        isIconOnly
        aria-label={isAdding ? "Create new" : "Edit"}
        color="secondary"
        radius="full"
        onPress={onAction}
      >
        <i className={`fa-solid ${isAdding ? "fa-plus" : "fa-pen"}`}></i>
      </Button>
    </div>
  );
}
