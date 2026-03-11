import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputImage from "@/components/form/FormInputPhoto";
import FormInputText from "@/components/form/FormInputText";

interface IJobTitleFormProps {
  industries: IOption[];
  categories: IOption[];
  subCategories: IOption[];
}
const JobTitleForm: React.FC<IJobTitleFormProps> = ({
  industries,
  categories,
  subCategories,
}) => {
  return (
    <div className="space-y-4">
      <FormInputSelect label="Industry" name="industry" options={industries} />
      <FormInputSelect label="Category" name="category" options={categories} />
      <FormInputSelect
        label="Sub Category"
        name="subcategory"
        options={subCategories}
      />
      <FormInputText
        label="Job Title"
        name="jobtitle"
        placeholder="e.g. Next Js Developer"
      />
      <FormInputImage label="Icon" name="icon" />
    </div>
  );
};
export default JobTitleForm;
