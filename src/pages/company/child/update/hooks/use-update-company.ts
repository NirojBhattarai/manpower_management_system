import { useUpdateDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import {
  companyValidationSchema,
  CompanyValidationSchemaType,
} from "@/pages/company/schema/company-schema";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import useCompanyDetails from "./use-company-details";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";

const useUpdateCompany = () => {
  const { id } = useParams();
  const [updateCompany, { isLoading }] = useUpdateDataMutation();

  const { companyDetails, isLoading: isInitialLoading } = useCompanyDetails({
    id: id ?? "",
  });
  const initialValues: CompanyValidationSchemaType = {
    companyName: companyDetails?.data?.companyName ?? "",
    country: companyDetails?.data?.country?.id || "",
    sector: companyDetails?.data?.sector || "",
    currency: companyDetails?.data?.currency || "",
    licenseNumberName: companyDetails?.data?.licenseNumberName || "",
    liscenseNumber: companyDetails?.data?.liscenseNumber || "",
    liscenseIssuedBy: companyDetails?.data?.liscenseIssuedBy || "",
    liscenseImage: companyDetails?.data?.liscenseImage || "",
    state: companyDetails?.data?.state || "",
    city: companyDetails?.data?.city || "",
    street: companyDetails?.data?.street || "",
    area: companyDetails?.data?.area || "",
    contactPersonName: companyDetails?.data?.contactPersonName || "",
    contactNumber: companyDetails?.data?.contactNumber || "",
    email: companyDetails?.data?.email || "",
    officeAddress: companyDetails?.data?.officeAddress || "",
    websiteUrl: companyDetails?.data?.websiteUrl || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: companyValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
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
      const response = (await updateCompany({
        data: formData,
        url: endpoints.company.update.replace(":id", id ?? ""),
        invalidateTag: [apiTags.company.list, apiTags.company.details],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {},
      });
    },
  });

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdateCompany;
