import { Modal, Input, Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

type Props = {
  title: string;
  fields: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }[];
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalCard({ title, fields, onSubmit, isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton>
      <ModalHeader>
        <h3>{title}</h3>
      </ModalHeader>
      <ModalBody>
        {fields.map((field, index) => (
          <Input
            key={index}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            aria-label={field.label}
            fullWidth
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" onPress={onSubmit}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}