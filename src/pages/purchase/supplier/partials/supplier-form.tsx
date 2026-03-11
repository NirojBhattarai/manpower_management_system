import { endpoints } from "@/api/endpoints";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import FormInputText from "@/components/form/FormInputText";

export function SupplierForm() {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText
        label="Name"
        name="name"
        placeholder="Enter Supplier Name"
      />
      <FormInputText
        label="Address"
        name="address"
        placeholder="Enter Supplier Address"
      />
      <div className="gap-4 grid grid-cols-2">
        <FormInputText
          label="Code"
          name="code"
          placeholder="Enter Supplier Code"
        />
        <FormInputText label="PAN" name="panNumber" placeholder="Enter PAN" />
        <FormInputText
          label="Phone"
          name="phone"
          placeholder="Enter Phone Number"
        />
        <FormAsyncInputSelect
          fetchUrl={endpoints.chartOfAccount.group.list}
          label="Account Group"
          name="group"
          labelKey="groupName"
          valueKey="id"
        />
      </div>
    </div>
  );
}
