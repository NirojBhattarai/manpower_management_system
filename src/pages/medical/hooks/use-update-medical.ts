import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useMedicalDetails from "./use-medical-details";
import {
  MedicalValidationSchema,
  UpdateMedicalSchemaType,
} from "../schema/medical-schema";

const useUpdateMedical = () => {
  const [updateMedical, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { medicalDetails, isLoading: isInitialLoading } = useMedicalDetails({
    id: updateId,
  });

  const initialValues: UpdateMedicalSchemaType = {
    hospital: medicalDetails?.data?.hospital?.id || "",
    examDate: medicalDetails?.data?.examDate || "",
    reportFile: medicalDetails?.data?.reportFile || "",
    remarks: medicalDetails?.data?.remarks || "",
    medicalStatus: medicalDetails?.data?.medicalStatus || "",
  };

  const formik = useFormik<UpdateMedicalSchemaType>({
    initialValues,
    validationSchema: MedicalValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("hospital", values.hospital);
      formData.append("examDate", values.examDate);
      if (values?.reportFile && values?.reportFile instanceof File)
        formData.append("reportFile", values.reportFile);
      formData.append("remarks", values.remarks);
      formData.append("medicalStatus", values.medicalStatus);
      const response = (await updateMedical({
        data: formData,
        url: endpoints.medical.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.medical.details, apiTags.medical.list],
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
    isInitialLoading,
  };
};

export default useUpdateMedical;
