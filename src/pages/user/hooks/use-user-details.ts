import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

interface IUserDetails {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}
type UserDetailsResponse = IApiDetailsResponse<IUserDetails>;

const useUserDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: UserDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.user.update.replace(":id", id ?? ""),
      tag: apiTags.user.details,
    },
    {
      skip: !id,
    },
  );

  return { userDetails: data, isLoading };
};

export default useUserDetails;
