import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

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
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                {closeText}
              </Button>
              <Button color="primary" onPress={onSubmit}>
                {submitText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
