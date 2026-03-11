import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

export const shramStatusForm: IOption[] = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const ShramForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText label="OLS Reference No." name="olsReferenceNo" />
      <FormInputDate label="Approval Date" name="approvalDate" />
      <FormInputPdf label="Approval File" name="approvalFile" />
      <FormInputSelect
        label="Labour Permit Status"
        name="shramStatus"
        options={shramStatusForm}
      />
    </div>
  );
};
export default ShramForm;
