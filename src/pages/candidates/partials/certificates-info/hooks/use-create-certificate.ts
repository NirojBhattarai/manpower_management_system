import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import {
  CertificateSchemaType,
  CertificateValidationSchema,
} from "../schema/certificates-info-schema";
import { useParams } from "react-router-dom";

const useCreateCertificate = () => {
  const [
    createCertificate,
    {
      isError: isCertificateError,
      isLoading: isCertificateLoading,
      isSuccess: isCertificateSuccess,
    },
  ] = usePostDataMutation();

  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.certificate.createCertificate.key,
    QUERY_PARAMS.certificate.createCertificate.value,
  );

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  const initialValues: CertificateSchemaType = {
    title: "",
    organizationName: "",
    certificateFile: "",
    description: "",
  };

  const formik = useFormik<CertificateSchemaType>({
    initialValues,
    validationSchema: CertificateValidationSchema,

    onSubmit: async (values, { setErrors, resetForm }) => {
      if (!jobSeekerId) {
        setErrors({ title: "Please create personal details first." });
        return;
      }

      const formData = new FormData();
      formData.append("jobseeker", jobSeekerId);
      formData.append("title", values.title);
      formData.append("organizationName", values.organizationName);
      if (values.certificateFile instanceof File)
        formData.append("certificateFile", values.certificateFile);
      if (values.description)
        formData.append("description", values.description);

      const response = (await createCertificate({
        url: endpoints.candidates.certificate.create,
        data: formData,
        invalidateTag: [apiTags.candidates.certificate.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
          resetForm();
        },
      });
    },
  });

  return {
    formik,
    isCertificateError,
    isCertificateLoading,
    isCertificateSuccess,
  };
};

export default useCreateCertificate;
