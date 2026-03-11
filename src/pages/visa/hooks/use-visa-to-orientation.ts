import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import { IVisaListItem } from "../interface/visa-interface";
import useVisaToOrientationModal from "./use-visa-to-orientation-modal";
import {
  OrientationSchemaType,
  OrientationValidationSchema,
} from "@/pages/orientation/schema/orientation-schema";

interface IMoveToOrientation {
  candidates?: IVisaListItem[];
}
const useVisaToOrientation = ({ candidates }: IMoveToOrientation) => {
  const [moveToOrientation, { isLoading }] = usePostDataMutation();
  const { handleCloseVisaToOrientation } = useVisaToOrientationModal();

  const initialValues: OrientationSchemaType = {
    instituteName: "",
    orientationDate: "",
  };

  const formik = useFormik<OrientationSchemaType>({
    initialValues,
    validationSchema: OrientationValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      if (candidates?.length === 0) return;

      const payload = candidates?.map((item) => {
        return {
          ...values,
          jobseeker: item?.jobseeker?.id,
          jobVacancy: item?.jobVacancy?.id,
          jobTitle: item?.jobTitle?.id,
          company: item?.company?.id,
        };
      });
      const response = (await moveToOrientation({
        data: payload,
        url: endpoints.orientation.create,
        invalidateTag: [
          apiTags.orientation.details,
          apiTags.orientation.list,
          apiTags.visa.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseVisaToOrientation();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useVisaToOrientation;
