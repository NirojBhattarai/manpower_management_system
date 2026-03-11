import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import useJobOfferToMedicalModal from "../hooks/use-job-offer-to-medical-modal";
import useJobTitleList, {
  IJobTitleListItem,
} from "@/pages/settings/job-setting/job-title/hooks/use-job-title-list";
import { IOption } from "@/components/form/form-input-select";

const JobOfferHeader = () => {
  const { handleOpenJobOfferToMedical } = useJobOfferToMedicalModal();
  const { jobTitleListResponse } = useJobTitleList();
  const jobVacancyOptions: IOption[] = jobTitleListResponse?.data?.records?.map(
    (jobTitle: IJobTitleListItem) => ({
      label: jobTitle.jobtitle,
      value: jobTitle.id,
    }),
  );
  return (
    <div>
      <PageHeader title="Job Offer" />
      <SearchFilter
        dateFilter={false}
        selectFilter={[
          {
            placeholder: "Select Job",
            option: jobVacancyOptions,
            paramsKey: "job-filter",
          },
          {
            placeholder: "Select Medical Stage",
            option: [
              { label: "Moved to Medical", value: "true" },
              { label: "Still in Job Offer", value: "false" },
            ],
            paramsKey: "moved-to-medical-filter",
          },
        ]}
        moveToModule={{
          moduleName: "Medical",
          handleClick: handleOpenJobOfferToMedical,
        }}
      />
    </div>
  );
};

export default JobOfferHeader;
