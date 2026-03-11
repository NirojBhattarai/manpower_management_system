import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { CertificateDetailsResponse } from "../interface/certificate-interface";

const useCertificateDetails = ({
  id,
  jobSeekerId,
}: {
  id: string | undefined;
  jobSeekerId: string | undefined;
}) => {
  const { data, isLoading } = useGetDataQuery<{
    data: CertificateDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.candidates.certificate.update
        .replace(":id", id ?? "")
        .replace(":jobSeekerId", jobSeekerId ?? ""),
      tag: apiTags.candidates.certificate.details,
    },
    {
      skip: !id,
    },
  );

  return { certificateDetails: data, isLoading };
};
export default useCertificateDetails;
