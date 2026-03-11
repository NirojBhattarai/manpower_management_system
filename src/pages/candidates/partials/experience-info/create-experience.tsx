import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateExperience from "./hooks/use-create-experience";
import ExperienceInfoForm from "./form/experience-info-form";

const CreateExperience = () => {
  const { formik, isExperienceLoading: isLoading } = useCreateExperience();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <ExperienceInfoForm />
    </ExtendedForm>
  );
};
export default CreateExperience;
