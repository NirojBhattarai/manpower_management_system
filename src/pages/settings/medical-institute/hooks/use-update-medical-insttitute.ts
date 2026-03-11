import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useMedicalInstituteDetails from "./use-medical-institute-details";
import {
  MediacalInstituteValidationSchema,
  MedicalInstituteSchemaType,
} from "../schema/medical-institute-schema";

const useUpdateMedicalInstitute = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateMedicalInstitute, { isLoading }] = useUpdateDataMutation();
  const { medicalInstituteDetails, isLoading: isInitialLoading } =
    useMedicalInstituteDetails({
      id: updateId ?? "",
    });
  const initialValues: MedicalInstituteSchemaType = {
    name: medicalInstituteDetails?.data?.name || "",
    address: medicalInstituteDetails?.data?.address || "",
    email: medicalInstituteDetails?.data?.email || "",
    phone: medicalInstituteDetails?.data?.phone || "",
  };

  const formik = useFormik<MedicalInstituteSchemaType>({
    initialValues,
    validationSchema: MediacalInstituteValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateMedicalInstitute({
        data: values,
        url: endpoints.medicalInstitute.update.replace(":id", updateId ?? ""),
        invalidateTag: [
          apiTags.medicalInstitute.list,
          apiTags.medicalInstitute.details,
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
export default useUpdateMedicalInstitute;
