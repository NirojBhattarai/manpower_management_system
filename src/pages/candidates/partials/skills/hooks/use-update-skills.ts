import { usePatchDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useGetSkillDetails } from "./use-skills-details";
import {
  SkillSchemaType,
  SkillValidationSchema,
} from "../schema/skills-schema";

export const useUpdateSkills = () => {
  const { id } = useParams();
  const [updateSkills, { isLoading }] = usePatchDataMutation();
  const { skillDetails, isLoading: isInitialLoading } = useGetSkillDetails({
    id: id ?? "",
  });
  const initialValues: SkillSchemaType = {
    skills: skillDetails?.data?.skills || [],
    languages: skillDetails?.data?.languages || [],
  };
  const formik = useFormik({
    initialValues,
    validationSchema: SkillValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      const response = (await updateSkills({
        data: values,
        url: endpoints.candidates.skillandLanguages.update.replace(
          ":id",
          id ?? "",
        ),
        invalidateTag: [
          apiTags.candidates.skillandLanguages.list,
          apiTags.candidates.skillandLanguages.details,
        ],
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
    isLoading,
    isInitialLoading,
    onSubmit,
  };
};
