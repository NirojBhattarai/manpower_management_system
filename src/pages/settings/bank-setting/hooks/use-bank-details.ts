import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { BankDetailsResponse } from "../interface/bank-setting-interface";

const useBankDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: BankDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.bank.details.replace(":id", id ?? ""),
      tag: apiTags.bank.details,
    },
    {
      skip: !id,
    },
  );

  return { bankDetails: data, isLoading };
};
export default useBankDetails;
