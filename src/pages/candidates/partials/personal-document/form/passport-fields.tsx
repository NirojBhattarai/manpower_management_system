import FormInputDate from "@/components/form/form-input-date";
import FormInputMultiplePdf from "@/components/form/form-input-multiple-file";
import FormInputText from "@/components/form/FormInputText";

export const PassportFields = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormInputMultiplePdf
        label="Passport Images"
        name="passport.passportImage"
        multiple
      />

      <FormInputText
        label="Passport Number"
        name="passport.passportNo"
        placeholder="Enter Passport Number"
      />

      <FormInputDate label="Issue Date" name="passport.issueDate" />

      <FormInputDate label="Expiry Date" name="passport.expiryDate" />
    </div>
  );
};
