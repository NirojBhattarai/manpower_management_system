import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IDocumentDetails {
  id: string;
  country: {
    id: string;
    country: string;
  };
  document: string;
}
type DocumentDetailsResponse = IApiDetailsResponse<IDocumentDetails>;

const useDocumentDetails = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: DocumentDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.document.details.replace(":id", id ?? ""),
      tag: apiTags.document.details,
    },
    {
      skip: !id,
    },
  );

  return { documentDetails: data, isLoading };
};
export default useDocumentDetails;
