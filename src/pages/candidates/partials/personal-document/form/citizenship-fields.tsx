import FormInputDate from "@/components/form/form-input-date";
import FormInputMultiplePdf from "@/components/form/form-input-multiple-file";
import FormInputText from "@/components/form/FormInputText";

export const CitizenshipFields = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormInputMultiplePdf
        label="Citizenship Images"
        name="citizenship.citizenImage"
        multiple
      />

      <FormInputText
        label="Citizenship Number"
        name="citizenship.citizenshipNo"
        placeholder="Enter Citizenship Number"
      />

      <FormInputDate label="Issue Date" name="citizenship.issueDate" />
    </div>
  );
};
