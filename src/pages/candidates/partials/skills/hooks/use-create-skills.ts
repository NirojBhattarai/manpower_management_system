import { usePatchDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import {
  SkillSchemaType,
  SkillValidationSchema,
} from "../schema/skills-schema";

const useCreateSkills = () => {
  const [
    createSkills,
    {
      isError: isSkillsError,
      isLoading: isSkillsLoading,
      isSuccess: isSkillsSuccess,
    },
  ] = usePatchDataMutation();

  const jobSeekerId = localStorage.getItem("jobSeekerId");

  const initialValues: SkillSchemaType = {
    skills: [],
    languages: [],
  };

  const formik = useFormik<SkillSchemaType>({
    initialValues,
    validationSchema: SkillValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      const response = (await createSkills({
        url: endpoints.candidates.skillandLanguages.create.replace(
          ":id",
          jobSeekerId ?? "",
        ),
        data: values,
        invalidateTag: [apiTags.candidates.skillandLanguages.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {},
      });
    },
  });
  const onSubmit = async () => {
    if (!formik.isValid) return false;
    return true;
  };

  return {
    formik,
    isSkillsError,
    isSkillsLoading,
    isSkillsSuccess,
    onSubmit,
  };
};

export default useCreateSkills;
