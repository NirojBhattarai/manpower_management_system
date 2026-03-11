import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useCertificateDetails from "./use-certificate-details";
import {
  CertificateSchemaType,
  CertificateValidationSchema,
} from "../schema/certificates-info-schema";

const useUpdateCertificate = () => {
  const { updateId, handleCloseModal, jobSeekerId } = useUpdateModal();
  const [updateCertificate, { isLoading }] = useUpdateDataMutation();
  const { certificateDetails, isLoading: isInitialLoading } =
    useCertificateDetails({
      id: updateId ?? "",
      jobSeekerId: jobSeekerId ?? "",
    });
  const initialValues: CertificateSchemaType = {
    title: certificateDetails?.data?.title || "",
    organizationName: certificateDetails?.data?.organizationName || "",
    certificateFile: certificateDetails?.data?.certificateFile || "",
    description: certificateDetails?.data?.description || "",
  };

  const formik = useFormik<CertificateSchemaType>({
    initialValues,
    validationSchema: CertificateValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      if (jobSeekerId) formData.append("jobseeker", jobSeekerId);
      formData.append("title", values.title);
      formData.append("organizationName", values.organizationName);
      if (values.certificateFile instanceof File)
        formData.append("certificateFile", values.certificateFile);
      if (values.description)
        formData.append("description", values.description);

      const response = (await updateCertificate({
        data: formData,
        url: endpoints.candidates.certificate.update
          .replace(":id", updateId ?? "")
          .replace(":jobSeekerId", jobSeekerId ?? ""),
        invalidateTag: [
          apiTags.candidates.certificate.list,
          apiTags.candidates.certificate.details,
        ],
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
export default useUpdateCertificate;
