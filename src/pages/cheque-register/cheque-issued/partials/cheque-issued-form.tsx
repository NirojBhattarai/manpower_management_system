import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";
import { chequeOptions } from "../../cheque-received/partials/cheque-received-form";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

const ChequeIssuedForm = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormAsyncInputSelect
        fetchUrl={endpoints.supplier.list}
        label="Supplier Account"
        name="supplierAccount"
        labelKey="name"
        valueKey="id"
      />
      <FormInputText label="Payee Name" name="payeeName" />
      <FormAsyncInputSelect
        fetchUrl={endpoints.bank.list}
        label="Bank Account"
        name="bankAccount"
        labelKey="bankName"
        valueKey="id"
      />
      <FormInputText label="Cheque No." name="chequeNumber" />
      <FormInputDate label="Cheque Date" name="chequeDate" />
      <FormInputDate label="Issued Date" name="issuedDate" />
      <FormInputText label="Amount" name="amount" />
      <FormInputSelect label="Status" name="status" options={chequeOptions} />
    </div>
  );
};

export default ChequeIssuedForm;
