import { useDeleteDataMutation } from "@/api/api";

const useDeleteIndustry = () => {
  const [deleteIndustry, { isLoading, isError, isSuccess }] =
    useDeleteDataMutation();

  const handleDeleteIndustry = async (id: number) => {
    try {
      await deleteIndustry({
        url: `/industry/${id}`,
      });
    } catch (error) {
      console.error("Failed to delete industry:", error);
    }
  };

  return {
    handleDeleteIndustry,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useDeleteIndustry;
