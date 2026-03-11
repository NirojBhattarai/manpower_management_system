import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IRoleDetails {
  id: string;
  label: string;
}
type RoleDetailsResponse = IApiDetailsResponse<IRoleDetails>;

const useRoleDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: RoleDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.role.update.replace(":id", id ?? ""),
      tag: apiTags.role.details,
    },
    {
      skip: !id,
    },
  );

  return { roleDetails: data, isLoading };
};

export default useRoleDetails;
