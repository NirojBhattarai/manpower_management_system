import useQueryParams from "./use-query-params";

export const useAddModal = (
  key: string = "add-modal",
  value: string = "active"
) => {
  const { updateQueryParams, getQueryParams, deleteQueryParams } =
    useQueryParams();
  const isOpen = getQueryParams(key) === value;

  const handleOpenModal = () => {
    updateQueryParams({ [key]: value });
  };

  const handleCloseModal = () => {
    deleteQueryParams([key]);
  };

  return {
    isOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
