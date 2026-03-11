import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputTextArea from "@/components/form/form-input-text-area";
import FormInputText from "@/components/form/FormInputText";

const ChartOfGroupForm = () => {
  const underOption: IOption[] = [
    { label: "Purchase", value: "purchase" },
    { label: "Deposite Assets", value: "deposite-assets" },
    { label: "Land", value: "land" },
    { label: "Long Term Investment", value: "long-term-investment" },
  ];
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText
        label="Group Name"
        name="groupName"
        placeholder="Enter Group Name"
        required
      />
      <FormInputSelect
        label="Group Type"
        name="under"
        options={underOption}
        placeholder="Select Group Type"
        required
      />
      <FormInputTextArea
        label="Description"
        name="description"
        placeholder="Enter Description"
      />
    </div>
  );
};
export default ChartOfGroupForm;
