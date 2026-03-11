import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { QuickPaymentDetailResponse } from "@/pages/quick-payment/interface/quick-payment-interface";

const useQuickPaymentDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: QuickPaymentDetailResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.quickPayment.update.replace(":id", id),
      tag: apiTags.quickPayment.details,
    },
    {
      skip: !id,
    },
  );
  return { quickPaymentDetails: data, isLoading };
};

export default useQuickPaymentDetails;
