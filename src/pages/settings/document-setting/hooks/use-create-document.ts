import { useGetDataQuery, usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import {
  DocumentSchemaType,
  DocumentValidationSchema,
} from "../schema/document-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import { IOption } from "@/components/form/form-input-select";
import { CountryListResponse } from "@/pages/country/hooks/use-country-list";

const useCreateDocument = () => {
  const [createDocument, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.setting.documentSetting.createDocument.key,
    QUERY_PARAMS.setting.documentSetting.createDocument.value,
  );
  const initialValues: DocumentSchemaType = {
    country: "",
    document: "",
  };

  const formik = useFormik<DocumentSchemaType>({
    initialValues,
    validationSchema: DocumentValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createDocument({
        url: endpoints.document.create,
        data: values,
        invalidateTag: [apiTags.document.list],
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

  return { formik, isLoading, countries };
};
export default useCreateDocument;
