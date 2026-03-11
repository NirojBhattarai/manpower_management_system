import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ChequeIssuedDetailsResponse } from "../interface/issued-cheque-interface";

const useIssuedChequeDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ChequeIssuedDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.chequeIssued.update.replace(":id", id ?? ""),
      tag: apiTags.chequeRegister.chequeIssued.details,
    },
    {
      skip: !id,
    },
  );

  return { issuedChequeDetails: data, isLoading };
};
export default useIssuedChequeDetails;
