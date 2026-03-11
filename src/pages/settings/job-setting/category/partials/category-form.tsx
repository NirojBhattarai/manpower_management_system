import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputImage from "@/components/form/FormInputPhoto";
import FormInputText from "@/components/form/FormInputText";

interface ICategoryFormProps {
  industries: IOption[];
}
const CategoryForm: React.FC<ICategoryFormProps> = ({ industries }) => {
  return (
    <div className="space-y-4">
      <FormInputSelect label="Industry" name="industry" options={industries} />
      <FormInputText
        label="Category"
        name="category"
        placeholder="e.g. Finance & Accounting"
      />
      <FormInputImage label="Icon" name="icon" />
    </div>
  );
};
export default CategoryForm;
