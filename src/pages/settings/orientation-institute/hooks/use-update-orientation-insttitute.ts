import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useOrientationInstituteDetails from "./use-orientation-institute-details";
import {
  OrientationInstituteSchemaType,
  OrientationInstituteValidationSchema,
} from "../schema/orientation-institute-schema";

const useUpdateOrientationInstitute = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateOrientationInstitute, { isLoading }] = useUpdateDataMutation();
  const { orientationInstituteDetails, isLoading: isInitialLoading } =
    useOrientationInstituteDetails({
      id: updateId ?? "",
    });
  const initialValues: OrientationInstituteSchemaType = {
    name: orientationInstituteDetails?.data?.name || "",
    address: orientationInstituteDetails?.data?.address || "",
    email: orientationInstituteDetails?.data?.email || "",
    phone: orientationInstituteDetails?.data?.phone || "",
  };

  const formik = useFormik<OrientationInstituteSchemaType>({
    initialValues,
    validationSchema: OrientationInstituteValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateOrientationInstitute({
        data: values,
        url: endpoints.orientationInstitute.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [
          apiTags.orientationInstitute.list,
          apiTags.orientationInstitute.details,
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
export default useUpdateOrientationInstitute;
