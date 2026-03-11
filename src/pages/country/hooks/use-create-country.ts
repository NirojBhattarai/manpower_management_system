import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import {
  CountrySchemaType,
  CountryValidationSchema,
} from "../schema/country-schema";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";

const initialValues: CountrySchemaType = {
  country: "",
  currency: "",
  capital: "",
  language: "",
};

const useCreateCountry = () => {
  const [createCountry, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.country.createCountry.key,
    QUERY_PARAMS.country.createCountry.value,
  );

  const formik = useFormik<CountrySchemaType>({
    initialValues,
    validationSchema: CountryValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createCountry({
        url: endpoints.country.create,
        data: values,
        invalidateTag: [apiTags.country.list],
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

  return {
    formik,
    isLoading,
  };
};

export default useCreateCountry;
