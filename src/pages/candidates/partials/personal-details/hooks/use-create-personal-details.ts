import { usePostDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import {
  PersonalDetailsSchemaType,
  PersonalDetailsValidationSchema,
} from "../schema/personal-details-schema";

const useCreatePersonalDetails = () => {
  const [
    createPersonalDetails,
    {
      isError: isPersonalDetailsError,
      isLoading: isPersonalDetailsLoading,
      isSuccess: isPersonalDetailsSuccess,
    },
  ] = usePostDataMutation();
  const initialValues: PersonalDetailsSchemaType = {
    fullName: "",
    passportNumber: "",
    dateOfBirth: "",
    birthPlace: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
  };

  const formik = useFormik<PersonalDetailsSchemaType>({
    initialValues,
    validationSchema: PersonalDetailsValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = await createPersonalDetails({
        url: endpoints.candidates.personalDetails.create,
        data: values,
        invalidateTag: [apiTags.candidates.personalDetails.list],
      }).unwrap();

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          const jobSeekerId = response?.data?.id;
          if (jobSeekerId) {
            localStorage.setItem("jobSeekerId", jobSeekerId);
          }
        },
      });
    },
  });
  const onSubmit = async () => {
    if (!formik.isValid) return false;
    return true;
  };

  return {
    formik,
    isPersonalDetailsError,
    isPersonalDetailsLoading,
    isPersonalDetailsSuccess,
    onSubmit,
  };
};

export default useCreatePersonalDetails;
