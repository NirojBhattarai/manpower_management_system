import { usePostDataMutation } from "@/api/api";
import { useAddModal } from "@/hooks/use-add-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import QUERY_PARAMS from "@/constant/query-params";
import {
  OrientationInstituteSchemaType,
  OrientationInstituteValidationSchema,
} from "../schema/orientation-institute-schema";

const useCreateOrientationInstitute = () => {
  const [createOrientationInstitute, { isLoading }] = usePostDataMutation();
  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.key,
    QUERY_PARAMS.setting.orientationInstitute.createOrientationInstitute.value,
  );
  const initialValues: OrientationInstituteSchemaType = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  const formik = useFormik<OrientationInstituteSchemaType>({
    initialValues,
    validationSchema: OrientationInstituteValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await createOrientationInstitute({
        url: endpoints.orientationInstitute.create,
        data: values,
        invalidateTag: [apiTags.orientationInstitute.list],
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
export default useCreateOrientationInstitute;
