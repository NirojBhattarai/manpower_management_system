import DeleteModal from "@/components/DeleteModal";
import { useDelete } from "@/hooks/useDelete";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";

const InvoiceModal = () => {
  const deleteVisa = useDelete({
    endpoints: endpoints.invoice.delete,
    invalidates: [apiTags.invoice.list],
  });
  return (
    <div>
      <DeleteModal
        isOpen={deleteVisa.isOpen}
        onCancel={deleteVisa.handleCancel}
        onConfirm={deleteVisa.handleDelete}
      />
    </div>
  );
};

export default InvoiceModal;
