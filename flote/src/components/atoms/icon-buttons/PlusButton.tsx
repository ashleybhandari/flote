import { Button } from "@nextui-org/button";

type Props = {
  ariaLabel: string;
  onClick: () => void;
};

export default function PlusButton({ ariaLabel, onClick }: Props) {
  return (
    <div className="text-end mb-3 md:mb-1">
      <Button
        isIconOnly
        aria-label={ariaLabel}
        color="secondary"
        radius="full"
        onPress={onClick}
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
}
