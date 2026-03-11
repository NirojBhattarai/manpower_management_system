import ModalWrapper from "@/components/shadcn/modal-wrapper";
import UpdateInterview from "./update-interview";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const InterviewModal = () => {
  const updateModal = useUpdateModal();
  const deleteInterview = useDelete({
    endpoints: endpoints.interviewSchedule.delete,
    invalidates: [apiTags.interviewSchedule.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Interview Result"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateInterview />
      </ModalWrapper>
      <DeleteModal
        isOpen={deleteInterview.isOpen}
        onCancel={deleteInterview.handleCancel}
        onConfirm={deleteInterview.handleDelete}
      />
    </div>
  );
};

export default InterviewModal;
