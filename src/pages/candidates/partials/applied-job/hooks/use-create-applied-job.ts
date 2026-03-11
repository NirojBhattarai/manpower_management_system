import { usePostDataMutation } from "@/api/api";
import { ApiResponse } from "@/api/api.error";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { useFormik } from "formik";
import {
  AppliedJobSchemaType,
  AppliedJobValidationSchema,
} from "../schema/applied-job-schema";
import { useAddModal } from "@/hooks/use-add-modal";
import QUERY_PARAMS from "@/constant/query-params";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useCreateAppliedJob = () => {
  const [
    createAppliedJob,
    {
      isError: isAppliedJobError,
      isLoading: isAppliedJobLoading,
      isSuccess: isAppliedJobSuccess,
    },
  ] = usePostDataMutation();

  const { handleCloseModal } = useAddModal(
    QUERY_PARAMS.appliedJob.createAppliedJob.key,
    QUERY_PARAMS.appliedJob.createAppliedJob.value,
  );

  const { id: paramJobSeekerId } = useParams();
  const localJobSeekerId = localStorage.getItem("jobSeekerId");

  const jobSeekerId = paramJobSeekerId || localJobSeekerId || "";

  const initialValues: AppliedJobSchemaType = {
    country: "",
    company: "",
    jobvacancy: "",
    description: "",
  };

  const formik = useFormik<AppliedJobSchemaType>({
    initialValues,
    validationSchema: AppliedJobValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      if (!jobSeekerId) {
        setErrors({ country: "Please create personal details first." });
        return;
      }

      const payload = {
        ...values,
        jobseeker: jobSeekerId,
      };

      const response = (await createAppliedJob({
        url: endpoints.candidates.appliedJob.create,
        data: payload,
        invalidateTag: [apiTags.candidates.appliedJob.list],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          handleCloseModal();
          resetForm();
        },
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("company", "");
    formik.setFieldValue("jobvacancy", "");
  }, [formik.values.country]);

  useEffect(() => {
    formik.setFieldValue("jobvacancy", "");
  }, [formik.values.company]);

  const onSubmit = async () => {
    if (!formik.isValid) return false;
    return true;
  };

  return {
    formik,
    isAppliedJobError,
    isAppliedJobLoading,
    isAppliedJobSuccess,
    onSubmit,
  };
};

export default useCreateAppliedJob;
