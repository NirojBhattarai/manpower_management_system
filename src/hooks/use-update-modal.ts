import { useParams } from "react-router-dom";
import useQueryParams from "./use-query-params";

export const useUpdateModal = (key: string = "update-id") => {
  const { updateQueryParams, deleteQueryParams, getQueryParams } =
    useQueryParams();

  const isOpen = Boolean(getQueryParams(key));
  const updateId = getQueryParams(key);

  const handleOpenModal = (id: string) => {
    updateQueryParams({ [key]: id });
  };

  const handleCloseModal = () => {
    deleteQueryParams([key]);
  };

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  return {
    isOpen,
    updateId,
    handleOpenModal,
    handleCloseModal,
    jobSeekerId,
  };
};
