import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateVisa from "./update-visa";

const VisaModal = () => {
  const updateModal = useUpdateModal();

  const deleteVisa = useDelete({
    endpoints: endpoints.visa.delete,
    invalidates: [apiTags.visa.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Visa"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateVisa />
      </ModalWrapper>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteVisa.isOpen}
        onCancel={deleteVisa.handleCancel}
        onConfirm={deleteVisa.handleDelete}
      />
    </div>
  );
};

export default VisaModal;
