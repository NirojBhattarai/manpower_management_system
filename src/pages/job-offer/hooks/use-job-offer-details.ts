import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { JobOfferDetailsResponse } from "../interface/job-offer-interface";

const useJobOfferDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: JobOfferDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.jobOffer.update.replace(":id", id ?? ""),
      tag: apiTags.jobOffer.details,
    },
    {
      skip: !id,
    },
  );

  return { jobOfferDetails: data, isLoading };
};
export default useJobOfferDetails;
