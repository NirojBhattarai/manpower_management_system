import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { PreApprovalDofeDetailsResponse } from "../interface/preapprovaldofe-interface";
import { apiTags } from "@/constant/tag";

interface IDetailsProps {
  id: string;
}
export const useGetPreApprovalDofeDetails = ({ id }: IDetailsProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: refetchPreApprovalDofeDetails,
  } = useGetDataQuery<{
    data: PreApprovalDofeDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>(
    {
      url: endpoints.preApprovalDofe.details.replace(":id", id),
      tag: apiTags.preApprovalDofe.details,
    },
    {
      skip: !id,
    },
  );
  return {
    preapprovalDetails: data,
    isLoading,
    isError,
    isSuccess,
    refetchPreApprovalDofeDetails,
  };
};
