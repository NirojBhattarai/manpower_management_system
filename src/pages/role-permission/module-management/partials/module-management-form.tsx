import ExtendedForm from "@/components/extended-components/ExtendedForm";
import FormInputSelect from "@/components/form/form-input-select";
import InputCheckbox from "@/components/form/form-checkbox";
import { useFormik } from "formik";

export default function ModuleManagementForm() {
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });
  return (
    <ExtendedForm submitText="Update Role" cancelText="Discard" formik={formik}>
      <div className="u-flex-child space-y-10 p-4">
        <FormInputSelect
          className="w-1/2"
          label="Role"
          name="role"
          options={[
            { label: "Super Admin", value: "super-admin" },
            { label: "Admin", value: "admin" },
            { label: "Manager", value: "manager" },
          ]}
        />
        <div className="grid grid-cols-4 gap-6">
          <InputCheckbox label="Dashboard" name="dashboard" />
          <InputCheckbox
            label="Recruitment Process"
            name="recruitment_process"
          />
          <InputCheckbox label="Income" name="income" />
          <InputCheckbox label="Expense" name="expense" />
          <InputCheckbox label="Invoice" name="invoice" />
          <InputCheckbox label="Chart of account" name="chart-of-account" />
          <InputCheckbox label="Chart of group" name="chart-of-group" />
          <InputCheckbox label="cheque Issued" name="cheque-issued" />
          <InputCheckbox label="cheque Received" name="cheque-received" />
        </div>
      </div>
    </ExtendedForm>
  );
}
