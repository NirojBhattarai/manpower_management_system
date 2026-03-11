import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

export const chequeOptions: IOption[] = [
  { label: "Cancelled", value: "cancelled" },
  { label: "Bounced", value: "bounced" },
  { label: "Cleared", value: "cleared" },
  { label: "Deposited", value: "deposited" },
  { label: "Pending", value: "pending" },
];

const ChequeReceivedForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormAsyncInputSelect
        fetchUrl={endpoints.chartOfAccount.account.list}
        label="Account"
        name="customerAccount"
        labelKey="accountName"
        valueKey="id"
      />
      <FormInputText label="Cheque Number" name="chequeNumber" />
      <div className="gap-4 grid grid-cols-2">
        <FormInputDate label="Cheque Date" name="chequeDate" />
        <FormInputDate label="Received Date" name="receivedDate" />
        <FormInputText label="Amount" name="amount" />
        <FormInputSelect label="Status" name="status" options={chequeOptions} />
      </div>
    </div>
  );
};

export default ChequeReceivedForm;
