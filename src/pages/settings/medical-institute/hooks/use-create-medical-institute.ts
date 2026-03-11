import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  MediacalInstituteValidationSchema,
  MedicalInstituteSchemaType,
} from "../schema/medical-institute-schema";

const useCreateMedicalInstitute = () => {
  const [createMedicalInstitute, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.key,
    QUERY_PARAMS.setting.medicalInstitute.createMedicalInstitute.value,
  );
  const initialValues: MedicalInstituteSchemaType = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  const formik = useFormik<MedicalInstituteSchemaType>({
    initialValues,
    validationSchema: MediacalInstituteValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createMedicalInstitute({
        url: endpoints.medicalInstitute.create,
        data: values,
        invalidateTag: [apiTags.medicalInstitute.list],
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

  return { formik, isLoading };
};
export default useCreateMedicalInstitute;
