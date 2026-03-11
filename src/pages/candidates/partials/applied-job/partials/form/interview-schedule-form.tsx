import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import { useFormikContext } from "formik";
import { InterviewScheduleSchemaType } from "../schema/interview-schedule-schema";
import FormInputText from "@/components/form/FormInputText";

export const interviewStatusOption: IOption[] = [
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
];
const InterviewScheduleForm = () => {
  const { values } = useFormikContext<InterviewScheduleSchemaType>();

  return (
    <div className="space-y-6">
      <FormInputDate label="Interview Date" name="interviewDate" />
      <FormInputSelect
        label="Interview Mode"
        name="interviewMode"
        options={[
          {
            label: "Online",
            value: "online",
          },
          {
            label: "Onsite",
            value: "onsite",
          },
        ]}
      />
      {values.interviewMode === "onsite" && (
        <FormInputText label="Interview Location" name="interviewLocation" />
      )}
      <FormInputText label="Interviewer Name" name="interviewerName" />
      <FormInputSelect
        label="Interview Status"
        name="interviewStatus"
        options={interviewStatusOption}
      />
    </div>
  );
};

export default InterviewScheduleForm;
