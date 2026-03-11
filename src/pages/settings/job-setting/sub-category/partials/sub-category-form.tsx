import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputImage from "@/components/form/FormInputPhoto";
import FormInputText from "@/components/form/FormInputText";

interface ISubcategoryFormProps {
  industries: IOption[];
  categories: IOption[];
}
const SubCategoryForm: React.FC<ISubcategoryFormProps> = ({
  industries,
  categories,
}) => {
  return (
    <div className="space-y-4">
      <FormInputSelect label="Industry" name="industry" options={industries} />
      <FormInputSelect label="Category" name="category" options={categories} />
      <FormInputText
        label="Sub Category"
        name="subcategory"
        placeholder="e.g. Frontend Developers"
      />
      <FormInputImage label="Icon" name="icon" />
    </div>
  );
};

export default SubCategoryForm;
