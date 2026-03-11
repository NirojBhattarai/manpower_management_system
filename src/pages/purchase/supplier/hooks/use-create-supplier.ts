import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import {
  SupplierSchemaType,
  SupplierValidationSchema,
} from "../schema/supplier-schema";
import QUERY_PARAMS from "@/constant/query-params";

const useCreateSupplier = () => {
  const [createAccount, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.supplier.createSupplier.key,
    QUERY_PARAMS.supplier.createSupplier.value,
  );

  const initialValues: SupplierSchemaType = {
    name: "",
    address: "",
    code: "",
    panNumber: "",
    phone: "",
    group: "",
  };
  const formik = useFormik<SupplierSchemaType>({
    initialValues,
    validationSchema: SupplierValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createAccount({
        url: endpoints.supplier.create,
        data: values,
        invalidateTag: [apiTags.supplier.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
        },
      });
    },
  });
  return { formik, isLoading };
};

export default useCreateSupplier;
