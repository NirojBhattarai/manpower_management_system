import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateMedical from "./update-medical";

const MedicalModal = () => {
  const updateModal = useUpdateModal();

  const deleteMedical = useDelete({
    endpoints: endpoints.medical.delete,
    invalidates: [apiTags.medical.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Medical"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateMedical />
      </ModalWrapper>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteMedical.isOpen}
        onCancel={deleteMedical.handleCancel}
        onConfirm={deleteMedical.handleDelete}
      />
    </div>
  );
};

export default MedicalModal;
