import { endpoints } from "@/api/endpoints";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect from "@/components/form/form-input-select";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

const InsuranceForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormAsyncInputSelect
        fetchUrl={endpoints.insuranceCompany.list}
        label="Insurance Institute"
        name="insuranceCompany"
        labelKey="name"
        valueKey="id"
      />
      <FormInputText label="Policy No" name="policyNumber" />
      <FormInputDate label="Valid From" name="validFrom" />
      <FormInputDate label="Valid To" name="validTo" />
      <FormInputPdf label="Insurance Document" name="insuranceDocument" />
      <FormInputSelect
        label="Insurance Status"
        name="insuranceStatus"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
      />
    </div>
  );
};

export default InsuranceForm;
