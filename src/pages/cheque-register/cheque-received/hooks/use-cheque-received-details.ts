import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ChequeReceivedDetailsResponse } from "../interface/cheque-received-interface";

const useReceivedChequeDetails = ({
  id,
}: {
  id: string | null | undefined;
}) => {
  const { data, isLoading } = useGetDataQuery<{
    data: ChequeReceivedDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.chequeReceived.update.replace(":id", id ?? ""),
      tag: apiTags.chequeRegister.chequeReceived.details,
    },
    {
      skip: !id,
    },
  );

  return { receivedChequeDetails: data, isLoading };
};
export default useReceivedChequeDetails;
