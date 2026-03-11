import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import {
  CountrySchemaType,
  CountryValidationSchema,
} from "../schema/country-schema";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useCountryDetails from "./use-country-details";

const useUpdateCountry = () => {
  const [updateCountry, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { countryDetails, isLoading: isInitialLoading } = useCountryDetails({
    id: updateId,
  });

  const initialValues: CountrySchemaType = {
    country: countryDetails?.data?.country || "",
    capital: countryDetails?.data?.capital || "",
    currency: countryDetails?.data?.currency || "",
    language: countryDetails?.data?.language || "",
  };

  const formik = useFormik<CountrySchemaType>({
    initialValues,
    validationSchema: CountryValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateCountry({
        data: values,
        url: endpoints.country.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.country.details, apiTags.country.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        }
      });
    },
  });

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdateCountry;
