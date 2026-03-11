import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";
import FormTextArea from "@/components/form/form-input-text-area";
import { InterviewScheduleSchemaType } from "@/pages/candidates/partials/applied-job/partials/schema/interview-schedule-schema";
import { useFormikContext } from "formik";

export const interviewResultOption: IOption[] = [
  { label: "Pending", value: "pending" },
  { label: "Selected", value: "selected" },
  { label: "Rejected", value: "rejected" },
];

export const interviewModeOption: IOption[] = [
  { label: "Online", value: "online" },
  { label: "Onsite", value: "onsite" },
];

const InterviewForm = () => {
  const { values } = useFormikContext<InterviewScheduleSchemaType>();
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputDate label="Interview Date" name="interviewDate" />

      <FormInputSelect
        label="Interview Mode"
        name="interviewMode"
        options={interviewModeOption}
      />

      {values.interviewMode === "onsite" && (
        <FormInputText label="Interview Location" name="interviewLocation" />
      )}

      <FormInputText label="Interviewer Name" name="interviewerName" />
      <FormInputSelect
        label="Interview Status"
        name="interviewStatus"
        options={[
          {
            label: "Scheduled",
            value: "scheduled",
          },
          {
            label: "Cancelled",
            value: "cancelled",
          },
          {
            label: "Completed",
            value: "completed",
          },
        ]}
      />
      <FormInputSelect
        label="Result"
        name="interviewResult"
        options={interviewResultOption}
      />
      <FormTextArea label="Remarks" name="remarks" />
    </div>
  );
};

export default InterviewForm;
