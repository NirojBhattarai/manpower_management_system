import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateJobOffer from "./update-job-offer";

const JobOfferModal = () => {
  const updateModal = useUpdateModal();
  const deleteJobOffer = useDelete({
    endpoints: endpoints.jobOffer.delete,
    invalidates: [apiTags.jobOffer.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Job Offer"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateJobOffer />
      </ModalWrapper>
      <DeleteModal
        isOpen={deleteJobOffer.isOpen}
        onCancel={deleteJobOffer.handleCancel}
        onConfirm={deleteJobOffer.handleDelete}
      />
    </div>
  );
};

export default JobOfferModal;
