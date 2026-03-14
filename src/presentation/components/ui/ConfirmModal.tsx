import { useConfirmStore } from "@/store/confirmStore";
import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmModal() {
  const { isOpen, message, description, onConfirm, close } = useConfirmStore();

  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Konfirmasi" size="sm">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={close}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Ya, Lanjutkan
        </Button>
      </div>
    </Modal>
  );
}
