import { useDeleteDataMutation } from "@/api/api";
import { showSuccessMessage } from "@/utils/toast";
import useQueryParams from "./use-query-params";
import { useParams } from "react-router-dom";

interface IProps {
  endpoints: string;
  invalidates?: string[];
}

export const useDelete = ({ endpoints, invalidates = [] }: IProps) => {
  const { getQueryParams, updateQueryParams, deleteQueryParams } =
    useQueryParams();
  const [deleteEntry, { isLoading }] = useDeleteDataMutation();
  const { id: jobSeekerId } = useParams();
  // URL is the source of truth
  const deleteId = getQueryParams("delete_id");
  const isOpen = Boolean(deleteId);

  const handleOpenModal = (id: string) => {
    updateQueryParams({ delete_id: id });
  };

  const handleCancel = () => {
    deleteQueryParams(["delete_id"]);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    if (jobSeekerId) {
      endpoints = endpoints.replace(":jobSeekerId", jobSeekerId);
    }

    const response = (await deleteEntry({
      url: endpoints.replace(":id", deleteId),
      invalidateTag: invalidates,
    })) as { data?: { message?: string } };

    if (response?.data?.message) {
      showSuccessMessage(response.data.message);
      handleCancel(); // close modal after success
    }
  };

  return {
    isOpen,
    deleteId,
    isLoading,
    handleOpenModal,
    handleCancel,
    handleDelete,
  };
};
