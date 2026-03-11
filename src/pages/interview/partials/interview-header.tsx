import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { interviewModeOption, interviewResultOption } from "./interview-form";
import useMoveToJobOfferModal from "../hooks/use-move-to-job-offer-modal";
import { IOption } from "@/components/form/form-input-select";
import useJobTitleList, {
  IJobTitleListItem,
} from "@/pages/settings/job-setting/job-title/hooks/use-job-title-list";

const InterviewHeader = () => {
  const { handleOpenMoveToJobOffer } = useMoveToJobOfferModal();
  const { jobTitleListResponse } = useJobTitleList();
  const jobVacancyOptions: IOption[] = jobTitleListResponse?.data?.records?.map(
    (jobTitle: IJobTitleListItem) => ({
      label: jobTitle.jobtitle,
      value: jobTitle.id,
    }),
  );
  return (
    <>
      <PageHeader title="Interview" />

      <SearchFilter
        dateFilter={false}
        selectFilter={[
          {
            placeholder: "Select Job",
            option: jobVacancyOptions,
            paramsKey: "job-filter",
          },
          {
            placeholder: "Select Mode",
            option: interviewModeOption,
            paramsKey: "interview-filter",
          },
          {
            placeholder: "Select Result",
            option: interviewResultOption,
            paramsKey: "result-filter",
          },
          {
            placeholder: "Select Job Offer Stage",
            option: [
              { label: "Moved to Job Offer", value: "true" },
              { label: "Still in Interview", value: "false" },
            ],
            paramsKey: "moved-to-job-offer-filter",
          },
        ]}
        moveToModule={{
          moduleName: "Job Offer",
          handleClick: handleOpenMoveToJobOffer,
        }}
      />
    </>
  );
};

export default InterviewHeader;
