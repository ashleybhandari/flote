import { Button } from "@nextui-org/button";

type Props = {
  isOpen: boolean;
  title: string;
  closeText: string;
  submitText: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

export default function GenericModal({
  isOpen,
  title,
  closeText,
  submitText,
  onClose,
  onSubmit,
  children,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex flex-col gap-4">{children}</div>
        <div className="mt-6 flex justify-end gap-4">
          <Button color="default" onPress={onClose}>
            {closeText}
          </Button>
          <Button color="primary" onPress={onSubmit}>
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
}
