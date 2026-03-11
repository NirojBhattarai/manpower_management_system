import { endpoints } from "@/api/endpoints";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormTextArea from "@/components/form/form-input-text-area";
import FormInputPdf from "@/components/form/FormInputPdf";

export const medicalStatusOption: IOption[] = [
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const MedicalForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputDate label="Exam Date" name="examDate" />
      <FormAsyncInputSelect
        fetchUrl={endpoints.medicalInstitute.list}
        label="Medical Institute"
        name="hospital"
        labelKey="name"
        valueKey="id"
      />
      <FormInputPdf label="Report File" name="reportFile" />
      <FormInputSelect
        label="Medical Status"
        name="medicalStatus"
        options={medicalStatusOption}
      />
      <FormTextArea label="Remarks" name="remarks" />
    </div>
  );
};
export default MedicalForm;
