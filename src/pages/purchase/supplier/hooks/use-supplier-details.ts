import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { SupplierDetailsResponse } from "../interface/supplier-interface";

const useSupplierDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: SupplierDetailsResponse;
    isLoading: boolean;
  }>({
    url: endpoints.supplier.details.replace(":id", id),
    tag: apiTags.supplier.details,
  });
  return { supplierDetail: data, isLoading };
};

export default useSupplierDetails;
