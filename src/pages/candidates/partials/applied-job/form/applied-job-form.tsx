import { endpoints } from "@/api/endpoints";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputTextArea from "@/components/form/form-input-text-area";
import { useFormikContext } from "formik";
import { AppliedJobSchemaType } from "../schema/applied-job-schema";

interface AppliedJobFormProps {
  hideApprovalStatus?: boolean;
}

export const approvalStatusOption: IOption[] = [
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "Shortlisted",
    value: "shortlisted",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];
const AppliedJobForm: React.FC<AppliedJobFormProps> = ({
  hideApprovalStatus = false,
}) => {
  const { values } = useFormikContext<AppliedJobSchemaType>();
  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-2">
        <FormAsyncInputSelect
          fetchUrl={endpoints.country.list}
          label="Country"
          name="country"
          labelKey="country"
          valueKey="id"
        />
        <FormAsyncInputSelect
          fetchUrl={endpoints.company.list}
          label="Company"
          name="company"
          labelKey="companyName"
          valueKey="id"
          dependedValueKey="country"
          dependedValue={values.country}
          disabled={values.country ? false : true}
        />
      </div>
      <div className="gap-4 grid grid-cols-1">
        <FormAsyncInputSelect
          fetchUrl={endpoints.jobVacancy.list}
          label="Job Vacancy"
          name="jobvacancy"
          labelKey="jobTitle.jobtitle"
          valueKey="id"
          dependedValueKey="company"
          dependedValue={values.company}
          disabled={values.company ? false : true}
        />
        {hideApprovalStatus ? null : (
          <FormInputSelect
            label="Approval Status"
            name="approvalStatus.status"
            options={approvalStatusOption}
          />
        )}
      </div>
      <div className="gap-4 grid grid-cols-1">
        <FormInputTextArea label="Description" name="description" />
      </div>
    </div>
  );
};

export default AppliedJobForm;
