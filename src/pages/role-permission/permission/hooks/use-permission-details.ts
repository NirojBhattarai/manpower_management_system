import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IPermissionDetails {
  id: string;
  role: {
    id: string;
    label: string;
  };
  adminAccess: boolean;
  permissionScopes: string[];
}
type PermissionDetailsResponse = IApiDetailsResponse<IPermissionDetails>;

const usePermissionDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: PermissionDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.permission.update.replace(":id", id ?? ""),
      tag: apiTags.permission.details,
    },
    {
      skip: !id,
    },
  );

  return { permissionDetails: data, isLoading };
};

export default usePermissionDetails;
