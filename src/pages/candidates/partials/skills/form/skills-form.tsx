import FormMultiValueInput from "@/components/form/form-multi-value-input";

const SkillsForm = () => {
  return (
    <div className="space-y-6 w-full h-fit">
      <FormMultiValueInput
        label="Skills"
        name="skills"
        placeholder="Add skill and press Enter"
      />
      <FormMultiValueInput
        label="Languages"
        name="languages"
        placeholder="Add skill and press Enter"
      />
    </div>
  );
};

export default SkillsForm;
