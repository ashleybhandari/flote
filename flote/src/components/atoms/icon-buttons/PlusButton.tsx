import { Button } from "@nextui-org/button";

type Props = {
  ariaLabel: string;
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
};

export default function PlusButton({
  ariaLabel,
  onClick,
  isDisabled,
  className,
}: Props) {
  return (
    <div className={className}>
      <Button
        isIconOnly
        aria-label={ariaLabel}
        color="secondary"
        radius="full"
        onPress={onClick}
        isDisabled={isDisabled}
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
}
