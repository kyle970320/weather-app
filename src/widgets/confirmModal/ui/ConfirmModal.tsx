import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}
export default function ConfirmModal({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      overlayClassName="bg-blue-900/30 backdrop-blur-sm"
    >
      <ModalContent className="max-w-md">
        <ModalHeader>
          <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        </ModalHeader>
        <ModalBody>
          <p className="text-foreground text-sm">{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button className="py-3" variant="primary" onClick={onConfirm}>
            확인
          </Button>
          <Button className="py-3" variant="common" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
