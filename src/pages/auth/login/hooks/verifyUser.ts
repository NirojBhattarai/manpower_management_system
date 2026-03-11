import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

export interface IVerifyUser {
  isAuthenticated: boolean;
}
type VerifyUserResponse = IApiDetailsResponse<IVerifyUser>;

const useUserVerify = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: VerifyUserResponse;
    isLoading: boolean;
  }>({
    url: endpoints.userVerify,
  });

  return {
    userVerifyResponse: data,
    isLoading,
  };
};
export default useUserVerify;
