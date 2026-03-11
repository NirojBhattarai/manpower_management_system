import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateShram from "./update-shram";

const ShramModal = () => {
  const updateModal = useUpdateModal();

  const deleteShram = useDelete({
    endpoints: endpoints.shram.delete,
    invalidates: [apiTags.shram.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Labour Permit"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateShram />
      </ModalWrapper>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteShram.isOpen}
        onCancel={deleteShram.handleCancel}
        onConfirm={deleteShram.handleDelete}
      />
    </div>
  );
};

export default ShramModal;
