import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { ExpenseDetailResponse } from "../../../interface/interface-expense";
import { apiTags } from "@/constant/tag";

const useExpenseDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ExpenseDetailResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.expense.details.replace(":id", id),
      tag: apiTags.expense.details,
    },
    {
      skip: !id,
    },
  );

  return { expenseDetails: data, isLoading };
};

export default useExpenseDetails;
