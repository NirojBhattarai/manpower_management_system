import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";
import { IUser } from "../interface/ILogin";

export type UserDetailResponse = IApiDetailsResponse<IUser>;
const useGetProfile = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: UserDetailResponse;
    isLoading: boolean;
  }>({
    url: endpoints.getProfile,
    tag: apiTags.getProfile,
  });

  return {
    userProfile: data,
    isLoading,
  };
};
export default useGetProfile;
