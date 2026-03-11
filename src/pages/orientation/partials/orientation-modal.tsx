import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateOrientation from "./update-orientation";

const OrientationModal = () => {
  const updateModal = useUpdateModal();

  const deleteOrientation = useDelete({
    endpoints: endpoints.orientation.delete,
    invalidates: [apiTags.orientation.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Orientation"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateOrientation />
      </ModalWrapper>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteOrientation.isOpen}
        onCancel={deleteOrientation.handleCancel}
        onConfirm={deleteOrientation.handleDelete}
      />
    </div>
  );
};

export default OrientationModal;
