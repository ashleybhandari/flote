import { Button } from "@nextui-org/react";

type ConfirmationModalProps = {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
  };
  
  export default function ConfirmationModal({
    isOpen,
    message,
    onClose,
    onConfirm,
  }: ConfirmationModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
          <div className="flex flex-col gap-4">
            <p>{message}</p>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }