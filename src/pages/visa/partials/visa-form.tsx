import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputPdf from "@/components/form/FormInputPdf";

export const visaStatusOption: IOption[] = [
  { label: "Accepted", value: "accepted" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

const VisaForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputDate label="Application Date" name="applicationDate" />
      <FormInputDate label="Approval Date" name="approvalDate" />
      <FormInputDate label="Visa Expiry Date" name="visaExpireDate" />
      <FormInputSelect
        label="Visa Status"
        name="visaStatus"
        options={visaStatusOption}
      />
      <FormInputPdf label="Visa File" name="visaFile" />
    </div>
  );
};
export default VisaForm;
