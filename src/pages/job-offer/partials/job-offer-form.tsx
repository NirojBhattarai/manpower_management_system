import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

export const jobOfferStatusOptions: IOption[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Received",
    value: "received",
  },
];
const JobOfferForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText label="Offer Letter Number" name="offerLetterNo" />
      <FormInputDate label="Offer Date" name="offerDate" />
      <FormInputDate label="Joining Date" name="joiningDate" />
      <FormInputPdf label="Offer Document" name="offeredDocument" />
      <FormInputSelect
        label="Job Offer Status"
        name="status"
        options={jobOfferStatusOptions}
      />
    </div>
  );
};
export default JobOfferForm;
