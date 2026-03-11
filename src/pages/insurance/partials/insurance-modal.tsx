import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateInsurance from "./update-insurance";

const InsuranceModal = () => {
  const updateModal = useUpdateModal();

  const deleteVisa = useDelete({
    endpoints: endpoints.insurance.delete,
    invalidates: [apiTags.insurance.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Insurance"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateInsurance />
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

export default InsuranceModal;
