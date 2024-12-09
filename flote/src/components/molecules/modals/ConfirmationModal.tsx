import GenericModal from "@atoms/GenericModal";

type Props = {
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
}: Props) {
  if (!isOpen) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      title="Confirmation"
      closeText="Cancel"
      submitText="Confirm"
      onClose={onClose}
      onSubmit={onConfirm}
    >
      <p>{message}</p>
    </GenericModal>
  );
}
