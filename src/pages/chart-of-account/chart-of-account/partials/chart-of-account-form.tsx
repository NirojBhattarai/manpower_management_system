import { endpoints } from "@/api/endpoints";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import FormInputTextArea from "@/components/form/form-input-text-area";
import FormInputText from "@/components/form/FormInputText";

const ChartOfAccountForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText
        label="Account Name"
        name="accountName"
        placeholder="Enter Account Name"
        required
      />
      <FormAsyncInputSelect
        fetchUrl={endpoints.chartOfAccount.group.list}
        label="Parent Group"
        name="group"
        labelKey="groupName"
        valueKey="id"
      />
      <FormInputTextArea
        label="Description"
        name="description"
        placeholder="Enter Description"
      />
      <FormInputText
        label="Account Code"
        name="code"
        required
        placeholder="Enter Account Code"
      />
    </div>
  );
};
export default ChartOfAccountForm;
