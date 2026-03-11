import FormInputText from "@/components/form/FormInputText";

const BankForm: React.FC = () => {
  return (
    <div className="space-y-4">
      <FormInputText
        label="Bank Name"
        name="bankName"
        placeholder="Enter Bank Name"
      />
      <FormInputText
        label="Account Number"
        name="accountNumber"
        placeholder="Enter Account Number"
      />
    </div>
  );
};
export default BankForm;
