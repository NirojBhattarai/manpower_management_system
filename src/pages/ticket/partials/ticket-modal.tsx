import ModalWrapper from "@/components/shadcn/modal-wrapper";
import DeleteModal from "@/components/DeleteModal";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import UpdateTicket from "./update-ticket";

const TicketModal = () => {
  const updateModal = useUpdateModal();

  const deleteTicket = useDelete({
    endpoints: endpoints.ticket.delete,
    invalidates: [apiTags.ticket.list],
  });
  return (
    <div>
      <ModalWrapper
        className="xl:max-w-xl"
        isOpen={updateModal.isOpen}
        name="Update Ticket"
        onOpenChange={updateModal.handleCloseModal}
      >
        <UpdateTicket />
      </ModalWrapper>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteTicket.isOpen}
        onCancel={deleteTicket.handleCancel}
        onConfirm={deleteTicket.handleDelete}
      />
    </div>
  );
};

export default TicketModal;
