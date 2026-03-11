import FormInputSelect from "@/components/form/form-input-select";
import { useFormikContext } from "formik";
import { CitizenshipFields } from "./citizenship-fields";
import { PassportFields } from "./passport-fields";
import { PoliceReportFields } from "./police-report-fields";

const PersonalDocumentForm = () => {
  const { values } = useFormikContext<any>();
  const documentTypeOptions = [
    { label: "Citizenship", value: "citizenship" },
    { label: "Passport", value: "passport" },
    { label: "Police Report", value: "policeReport" },
  ];

  return (
    <div className="space-y-6 min-h-48">
      <FormInputSelect
        label="Document Type"
        name="documentType"
        options={documentTypeOptions}
        placeholder="Select Document Type"
      />

      {values.documentType === "citizenship" && <CitizenshipFields />}
      {values.documentType === "passport" && <PassportFields />}
      {values.documentType === "policeReport" && <PoliceReportFields />}
    </div>
  );
};

export default PersonalDocumentForm;
