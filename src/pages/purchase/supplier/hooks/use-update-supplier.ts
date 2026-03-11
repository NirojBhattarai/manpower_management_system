import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useSupplierDetails from "./use-supplier-details";
import {
  SupplierSchemaType,
  SupplierValidationSchema,
} from "../schema/supplier-schema";

const useUpdateSupplier = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateSupplier, { isLoading }] = useUpdateDataMutation();
  const { supplierDetail, isLoading: isInitialLoading } = useSupplierDetails({
    id: updateId ?? "",
  });
  const initialValues: SupplierSchemaType = {
    name: supplierDetail?.data?.name || "",
    address: supplierDetail?.data?.address || "",
    code: supplierDetail?.data?.code || "",
    panNumber: supplierDetail?.data?.panNumber || "",
    phone: supplierDetail?.data?.phone || "",
    group: supplierDetail?.data?.group?.id || "",
  };

  const formik = useFormik<SupplierSchemaType>({
    initialValues,
    validationSchema: SupplierValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateSupplier({
        data: values,
        url: endpoints.supplier.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.supplier.details, apiTags.supplier.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        },
      });
    },
  });

  return { formik, isLoading, isInitialLoading };
};

export default useUpdateSupplier;
