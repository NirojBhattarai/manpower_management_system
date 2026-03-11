import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { MembershipDetailsResponse } from "../interface/membership-interface";

const useMembershipDetails = () => {
  const { data, isLoading } = useGetDataQuery<{
    data: MembershipDetailsResponse;
    isLoading: boolean;
  }>({
    url: endpoints.membership.list,
    tag: apiTags.bank.details,
  });

  return {
    membershipDetails: data,
    isLoading,
  };
};
export default useMembershipDetails;
