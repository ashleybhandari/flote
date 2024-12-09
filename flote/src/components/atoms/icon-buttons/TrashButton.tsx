import { Button } from "@nextui-org/button";

type Props = {
  onClick: () => void;
};

export default function TrashButton({ onClick }: Props) {
  return (
    <Button
      isIconOnly
      aria-label="Delete"
      variant="light"
      radius="full"
      onPress={onClick}
      className="mr-1"
    >
      <i className="fa-solid fa-trash"></i>
    </Button>
  );
}
