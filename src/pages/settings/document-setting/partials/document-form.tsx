import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";

interface IDocumentFormProps {
  countries: IOption[];
}
const DocumentForm: React.FC<IDocumentFormProps> = ({ countries }) => {
  return (
    <div className="space-y-4">
      <FormInputSelect label="Country" name="country" options={countries} />
      <FormInputText
        label="Document"
        name="document"
        placeholder="e.g. Passport"
      />
    </div>
  );
};
export default DocumentForm;
