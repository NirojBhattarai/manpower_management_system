import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import {
  AppliedJobSchemaType,
  AppliedJobValidationSchema,
} from "../schema/applied-job-schema";
import useApppliedJobDetails from "./use-applied-job-details";
import useCompanyList from "@/pages/company/hooks/use-get-industry";
import useCountryList from "@/pages/country/hooks/use-country-list";
import useJobVacancyList from "@/pages/job-vacancy/hooks/use-job-vacancy-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdateApppliedJob = () => {
  const { updateId, handleCloseModal, jobSeekerId } = useUpdateModal();
  const [updateAppliedJob, { isLoading }] = useUpdateDataMutation();
  const { appliedJobDetails, isLoading: isInitialLoading } =
    useApppliedJobDetails({
      id: updateId ?? "",
      jobSeekerId: jobSeekerId ?? "",
    });

  const initialValues: AppliedJobSchemaType = {
    country: appliedJobDetails?.data?.country?.id || "",
    company: appliedJobDetails?.data?.company?.id || "",
    jobvacancy: appliedJobDetails?.data?.jobvacancy?.id || "",
    approvalStatus: {
      status: appliedJobDetails?.data?.approvalStatus?.status || "",
    },
    description: appliedJobDetails?.data?.description || "",
  };

  const formik = useFormik<AppliedJobSchemaType>({
    initialValues,
    validationSchema: AppliedJobValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateAppliedJob({
        data: values,
        url: endpoints.candidates.appliedJob.update
          .replace(":id", updateId ?? "")
          .replace(":jobSeekerId", jobSeekerId ?? ""),
        invalidateTag: [
          apiTags.candidates.appliedJob.list,
          apiTags.candidates.appliedJob.details,
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

  const { companyListResponse } = useCompanyList();
  const { countryListResponse } = useCountryList();
  const { jobVacancyListResponse } = useJobVacancyList();

  const companies: IOption[] = [];
  companyListResponse?.data?.records?.forEach((item) => {
    companies.push({ value: item.id, label: item.companyName });
  });

  const countries: IOption[] = [];
  countryListResponse?.data?.records?.forEach((item) => {
    countries.push({ value: item.id, label: item.country });
  });

  const jobVacancies: IOption[] = [];
  jobVacancyListResponse?.data?.records?.forEach((item) => {
    jobVacancies.push({ value: item.id, label: item.jobTitle.jobtitle });
  });

  return {
    formik,
    companies,
    countries,
    jobVacancies,
    isLoading,
    isInitialLoading,
  };
};
export default useUpdateApppliedJob;
