import { useGetDataQuery, useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import useDocumentDetails from "./use-document-details";
import {
  DocumentSchemaType,
  DocumentValidationSchema,
} from "../schema/document-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { CountryListResponse } from "@/pages/country/hooks/use-country-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdateDocument = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateDocument, { isLoading }] = useUpdateDataMutation();
  const { documentDetails, isLoading: isInitialLoading } = useDocumentDetails({
    id: updateId ?? "",
  });
  const initialValues: DocumentSchemaType = {
    country: documentDetails?.data?.country?.id || "",
    document: documentDetails?.data?.document || "",
  };

  const formik = useFormik<DocumentSchemaType>({
    initialValues,
    validationSchema: DocumentValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateDocument({
        data: values,
        url: endpoints.document.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.document.list, apiTags.document.details],
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
  const { data: countryList } = useGetDataQuery<{
    data: CountryListResponse;
  }>({ url: endpoints.country.list });

  const countries: IOption[] =
    countryList?.data?.records.map((country) => ({
      label: `${country?.country}`,
      value: country?.id,
    })) || [];
  return { formik, isLoading, isInitialLoading, countries };
};
export default useUpdateDocument;
