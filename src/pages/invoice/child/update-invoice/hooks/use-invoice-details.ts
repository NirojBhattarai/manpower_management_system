import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { InvoiceDetailResponse } from "@/pages/invoice/interface/invoice-interfaces";

const useInvoiceDetails = ({ id }: { id: string }) => {
  const { data: invoiceDetails, isLoading } = useGetDataQuery<{
    data: InvoiceDetailResponse;
    isLoading: boolean;
  }>({
    url: endpoints?.invoice?.details.replace(":id", id),
    tag: apiTags.invoice.details,
  });

  return { invoiceDetails, isLoading };
};

export default useInvoiceDetails;
