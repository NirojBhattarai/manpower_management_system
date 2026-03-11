import { useFormik } from "formik";
import { usePostDataMutation } from "@/api/api";
import {
  companyValidationSchema,
  CompanyValidationSchemaType,
} from "../../../schema/company-schema";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";

const useCreateCompany = () => {
  const [
    createCompany,
    {
      isError: isCompanyError,
      isLoading: isCompanyLoading,
      isSuccess: isCompanySuccess,
    },
  ] = usePostDataMutation();

  const initialValues: CompanyValidationSchemaType = {
    companyName: "",
    country: "",
    sector: "",
    currency: "",
    licenseNumberName: "",
    liscenseNumber: "",
    liscenseIssuedBy: "",
    liscenseImage: "",
    state: "",
    city: "",
    street: "",
    area: "",
    contactPersonName: "",
    contactNumber: "",
    email: "",
    officeAddress: "",
    websiteUrl: "",
  };

  const formik = useFormik<CompanyValidationSchemaType>({
    initialValues,
    validationSchema: companyValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("country", values.country);
      formData.append("sector", values.sector);
      formData.append("currency", values.currency);
      formData.append("licenseNumberName", values.licenseNumberName);
      formData.append("liscenseNumber", values.liscenseNumber);
      formData.append("liscenseIssuedBy", values.liscenseIssuedBy);
      if (values?.liscenseImage && values?.liscenseImage instanceof File)
        formData.append("liscenseImage", values.liscenseImage);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("street", values.street);
      formData.append("area", values.area);
      formData.append("contactPersonName", values.contactPersonName);
      formData.append("contactNumber", values.contactNumber);
      formData.append("email", values.email);
      formData.append("officeAddress", values.officeAddress);
      formData.append("websiteUrl", values.websiteUrl);
      const response = (await createCompany({
        url: endpoints.company.create,
        data: formData,
        invalidateTag: [apiTags.company.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
        },
      });
    },
  });

  return {
    formik,
    isCompanyError,
    isCompanyLoading,
    isCompanySuccess,
  };
};

export default useCreateCompany;
